import { useState, useEffect, useCallback } from 'react';
import type { AssetType, GeckoCoin } from '../types';
import { FIAT_ASSETS } from '../constants/fiatAssets';

export const useConversion = () => {
    const [assets, setAssets] = useState<GeckoCoin[]>([]);
    const [fromAsset, setFromAsset] = useState<AssetType>('BTC');
    const [toAsset, setToAsset] = useState<AssetType>('BRL');
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
            else if (response.status === 429) {
                setError("Limite de taxa atingido (Cooldown). O gráfico pode não atualizar.");
            }
        } catch (e) {
            console.error("Erro ao buscar histórico:", e);
        }
    }, [API_KEY]);

    useEffect(() => {
        const fetchTopCoins = async () => {
            const cached = localStorage.getItem('nexus-assets-cache');
            const lastFetch = localStorage.getItem('nexus-assets-last-fetch');

            if (cached && lastFetch && Date.now() - Number(lastFetch) < 5 * 60 * 1000) {
                const apiData = JSON.parse(cached);
                setAssets([...FIAT_ASSETS, ...apiData]);
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
                    setAssets([...FIAT_ASSETS, ...data]);
                    localStorage.setItem('nexus-assets-cache', JSON.stringify(data));
                    localStorage.setItem('nexus-assets-last-fetch', Date.now().toString());
                    setError(null);
                } else if (response.status === 429) {
                    setError("API em Cooldown (429). Usando preços salvos em cache.");
                    console.warn("Rate Limit atingido. Ativando fallback de cache.");
                    if (cached) {
                        setAssets([...FIAT_ASSETS, ...JSON.parse(cached)]);
                    }
                } else {
                    console.warn(`API Error ${response.status}. Tentando recuperar cache antigo...`);
                    if (cached) {
                        setAssets([...FIAT_ASSETS, ...JSON.parse(cached)]);
                    } else {
                        setAssets(FIAT_ASSETS);
                    }
                }
            } catch (err) {
                console.error("Erro de conexão/CORS:", err);

                setError("API em Cooldown (429/CORS). Usando preços salvos em cache.");

                if (cached) {
                    setAssets([...FIAT_ASSETS, ...JSON.parse(cached)]);
                } else {
                    setAssets(FIAT_ASSETS);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopCoins();
    }, [API_KEY]);

    useEffect(() => {
        if (assets.length > 0) {
            const currentCoin = assets.find(
                c => c.symbol.toLowerCase() === fromAsset.toLowerCase()
            );

            const isFiat = ['brl', 'usd', 'eur'].includes(fromAsset.toLowerCase());

            if (currentCoin?.id && !isFiat) {
                const timer = setTimeout(() => {
                    fetchHistory(currentCoin.id);
                }, 400);
                return () => clearTimeout(timer);
            } else {
                setChartData([]);
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

        const termFrom = fromAsset.toLowerCase().trim();
        const termTo = toAsset.toLowerCase().trim();

        const fromCoin = assets.find(c =>
            c.symbol.toLowerCase() === termFrom ||
            c.id.toLowerCase() === termFrom
        );

        const toCoin = assets.find(c =>
            c.symbol.toLowerCase() === termTo ||
            c.id.toLowerCase() === termTo
        );

        if (fromCoin && toCoin) {
            const priceFrom = Number(fromCoin.current_price);
            const priceTo = Number(toCoin.current_price);

            if (priceFrom > 0 && priceTo > 0) {
                const rate = priceFrom / priceTo;
                setResult({ rate, value: numAmount * rate });
                setError(null);
                console.log(`SUCESSO! ${fromCoin.name} -> ${toCoin.name} | Taxa: ${rate}`);
            } else {
                setError("Erro nos valores de preço (Zero).");
            }
        } else {
            console.warn("Falha crítica na busca:", {
                buscouPor: { termFrom, termTo },
                disponiveis: assets.map(a => `${a.symbol}:${a.id}`).slice(0, 10)
            });
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