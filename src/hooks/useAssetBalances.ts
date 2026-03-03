import { useMemo } from 'react';
import { useTransactionContext } from '../contexts/TransactionContext';
import { usePrices } from './usePrices'; 
import { ASSET_CONFIG } from '../config/assets';
import type { AssetType } from '../types';

export const useAssetBalances = () => {
    const { users } = useTransactionContext();
    const { priceMap, isLoading } = usePrices(); 

    const assetBalances = useMemo(() => {
        const tickers = Object.keys(ASSET_CONFIG) as AssetType[];

        return tickers.map(ticker => {
            const total = users.reduce((acc, user) => {
                const balance = user.balance;
                const amount = balance[ticker as keyof typeof balance] ||
                    balance[ticker.toLowerCase() as keyof typeof balance] ||
                    0;

                return acc + (Number(amount) || 0);
            }, 0);

            const usdPrice = priceMap[ticker.toLowerCase()] ?? 0;
            const brlPrice = ticker === 'BRL' ? 1 : usdPrice * 5.10; 
            const valueInBRL = total * brlPrice;

            let formattedValue = "";
            if (ticker === 'BRL') {
                formattedValue = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            } else {
                const precision = ASSET_CONFIG[ticker].precision || 8;
                formattedValue = `${total.toFixed(precision)} ${ticker}`;
            }

            return {
                ticker,
                value: formattedValue, 
                rawTotal: total,
                convertedBRL: valueInBRL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                rawBRL: valueInBRL
            };
        });
    }, [users, priceMap]); 

    const totalEquity = useMemo(() => {
        return assetBalances.reduce((acc, asset) => acc + asset.rawBRL, 0);
    }, [assetBalances]);

    return { 
        assetBalances, 
        totalEquity, 
        isLoadingPrices: isLoading 
    };
};