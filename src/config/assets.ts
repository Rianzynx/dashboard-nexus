import type { ComponentType } from 'react';
import * as Icon from '../components/Icons';
import type { AssetType } from '../types';

interface AssetConfig {
    name: string;
    symbol: AssetType;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
    precision: number;
}

export interface AssetDetails {
    symbol: AssetType;
    name: string;
    icon: ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    precision: number;
}

export const ASSET_CONFIG: Record<AssetType, AssetConfig> = {
    BRL: {
        name: 'Real Brasileiro',
        symbol: 'BRL',
        icon: Icon.CryptoBRL,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        precision: 2
    },
    USD: {
        name: "Dólar Americano",
        symbol: "USD",
        icon: Icon.CryptoDollar, 
        color: "text-slate-500",
        bgColor: "bg-slate-500/10",
        borderColor: "border-slate-500/20",
        precision: 2,
    },
    BTC: {
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: Icon.CryptoBTC,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        precision: 8
    },
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: Icon.CryptoETH,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        borderColor: 'border-blue-400/20',
        precision: 8
    },
    USDT: {
        name: 'Tether (ERC20)',
        symbol: 'USDT',
        icon: Icon.CryptoUSDT,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-400/10',
        borderColor: 'border-emerald-400/20',
        precision: 2
    },
    SOL: {
        symbol: 'SOL',
        name: 'Solana',
        icon: Icon.CryptoSOL,
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/10',
        borderColor: 'border-purple-400/20',
        precision: 4,
    },
    ADA: {
        symbol: 'ADA',
        name: 'Cardano',
        icon: Icon.CryptoADA,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        precision: 6,
    }
};


export const ASSET_LIST = Object.values(ASSET_CONFIG);