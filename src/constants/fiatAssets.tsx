import * as Icon from '../components/Icons';
import type { GeckoCoin } from '../types';

export const FIAT_ASSETS: GeckoCoin[] = [
    {
        id: 'usd-currency',
        symbol: 'usd', 
        name: 'Dólar Americano',
        image: '',
        icon: <Icon.CryptoDollar className="w-5 h-5 text-blue-500" />,
        current_price: 1,
    },
    {
        id: 'brl-currency',
        symbol: 'brl',
        name: 'Real Brasileiro',
        image: '',
        icon: <Icon.CryptoBRL className="w-5 h-5 text-emerald-500" />,
        current_price: 1 / 5.25,
    },
    {
        id: 'eur-currency',
        symbol: 'eur',
        name: 'Euro',
        image: '',
        icon: <Icon.CryptoEuro className="w-5 h-5 text-indigo-500" />,
        current_price: 1.16,
    }
];