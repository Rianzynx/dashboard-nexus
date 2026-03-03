import { useState, useEffect, useCallback } from 'react';
import type { AssetType, GeckoCoin } from '../types';

export const useConversion = () => {
    const [assets, setAssets] = useState<GeckoCoin[]>([]);
    const [fromAsset, setFromAsset] = useState<AssetType>('BTC');
    const [toAsset, setToAsset] = useState<AssetType>('USDT');
    const [amount, setAmount] = useState<string>('');
    const [result, setResult] = useState<{ value: number; rate: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [chartData, setChartData] = useState<[number, number][]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

    // --- BUSCA DE HISTÓRICO COM CACHE ---
    const fetchHistory = useCallback(async (coinId: string) => {
        if (!coinId) return;

        const cacheKey = `chart-cache-${coinId}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            const { timestamp, prices } = JSON.parse(cachedData);
            if (Date.now() - timestamp < 30 * 60 * 1000) {
                setChartData(prices);
                return;
            }
        }

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
                { headers: { 'x-cg-demo-api-key': API_KEY || '', 'accept': 'application/json' } }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.prices) {
                    setChartData(data.prices);
                    localStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: Date.now(),
                        prices: data.prices
                    }));
                }
            }
        } catch (e) {
            console.error("Erro ao buscar histórico:", e);
        }
    }, [API_KEY]);

    // --- CARREGAR ATIVOS (COM CACHE) ---
    useEffect(() => {
        const fetchTopCoins = async () => {
            const cached = localStorage.getItem('nexus-assets-cache');
            const lastFetch = localStorage.getItem('nexus-assets-last-fetch');

            if (cached && lastFetch && Date.now() - Number(lastFetch) < 5 * 60 * 1000) {
                setAssets(JSON.parse(cached));
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`,
                    { headers: { 'x-cg-demo-api-key': API_KEY || '', 'accept': 'application/json' } }
                );

                if (response.ok) {
                    const data = await response.json();
                    setAssets(data);
                    localStorage.setItem('nexus-assets-cache', JSON.stringify(data));
                    localStorage.setItem('nexus-assets-last-fetch', Date.now().toString());
                } else if (response.status === 429) {
                    console.error("Limite de taxa atingido (Rate Limit). Usando cache.");
                }
            } catch (err) {
                console.error("Erro na requisição:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopCoins();
    }, []);

    useEffect(() => {
        if (assets.length > 0) {
            const currentCoin = assets.find(
                c => c.symbol.toLowerCase() === fromAsset.toLowerCase()
            );

            if (currentCoin?.id) {
                const timer = setTimeout(() => {
                    fetchHistory(currentCoin.id);
                }, 400);
                return () => clearTimeout(timer);
            }
        }
    }, [fromAsset, assets, fetchHistory]);

    // --- LÓGICA DE CONVERSÃO ---
    const handleConvert = useCallback(() => {
        const numAmount = Number(amount);
        if (!amount || isNaN(numAmount) || numAmount <= 0 || assets.length === 0) {
            setResult(null);
            return;
        }

        const fromCoin = assets.find(c => c.symbol.toUpperCase() === fromAsset.toUpperCase());
        const toCoin = assets.find(c => c.symbol.toUpperCase() === toAsset.toUpperCase());

        if (fromCoin?.current_price && toCoin?.current_price) {
            const rate = fromCoin.current_price / toCoin.current_price;
            setResult({ rate, value: numAmount * rate });
            setError(null);
        } else {
            setError("Preços indisponíveis.");
        }
    }, [amount, fromAsset, toAsset, assets]);

    useEffect(() => {
        const timer = setTimeout(handleConvert, 300);
        return () => clearTimeout(timer);
    }, [handleConvert]);

    const handleSwap = () => {
        setFromAsset(toAsset);
        setToAsset(fromAsset);
        setResult(null);
    };

    const handleAssetChange = (type: 'from' | 'to', value: string) => {
        if (type === 'from') setFromAsset(value as AssetType);
        else setToAsset(value as AssetType);
        setResult(null);
    };

    return {
        assets, isLoading, fromAsset, setFromAsset, toAsset, setToAsset,
        amount, setAmount, result, error, chartData,
        handleSwap, handleAssetChange
    };
};