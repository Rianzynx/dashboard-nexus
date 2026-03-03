import { useMemo } from 'react';
import { useConversion } from './useConversion';

export const usePrices = () => {
    const { assets } = useConversion();

    const priceMap = useMemo(() => {
        return assets.reduce((acc, coin) => {
            if (coin.symbol) {
                acc[coin.symbol.toLowerCase()] = coin.current_price;
            }
            return acc;
        }, {} as Record<string, number | undefined>);
    }, [assets]); 

    return { priceMap, isLoading: assets.length === 0 };
};