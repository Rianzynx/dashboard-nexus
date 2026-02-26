import type { AssetType } from '../types';

export const mockAssets: { ticker: AssetType; name: string; value: string }[] = [
    { ticker: 'BRL', name: 'Real Brasileiro', value: 'R$ 12.450,00' },
    { ticker: 'BTC', name: 'Bitcoin', value: '0.045 BTC' },
    { ticker: 'ETH', name: 'Ethereum', value: '1.25 ETH' },
    { ticker: 'USDT', name: 'Tether', value: '500.00 USDT' },
];