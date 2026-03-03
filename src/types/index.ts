import type { ComponentType, ReactNode } from "react";

export type UserStatus = 'ACTIVE' | 'PENDING' | 'BLOCKED';
export type TransactionType = 'DEPOSIT' | 'WITHDRAW';
export type AssetType = 'BRL' | 'USD' | 'BTC' | 'ETH' | 'USDT' |  'SOL' | 'ADA';

export interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
    createdAt: string;
    lastActivity: string;
    balance: Record<AssetType, number>;
}

export interface Transaction {
    id: string;
    userId: string;
    userName: string;
    type: TransactionType;
    asset: AssetType;
    amount: number;
    date: string;
    observation?: string;
}

export interface Indicator {
    id: number;
    ticker?: AssetType;
    label: string;
    value: string;
    trend?: string;
    color?: string;
    icon?: ReactNode;
}


export interface AssetDetails {
    symbol: AssetType;
    name: string;
    icon: ComponentType<{ className?: string }>; 
    color: string;
    bgColor: string;
}


export interface GeckoCoin {
    id: string;
    symbol: string;
    name: string;
    image: string; 
    current_price?: number;
}

export interface TransactionContextData {
    users: User[];
    allTransactions: Transaction[];
    prices: GeckoCoin[];
    isLoadingPrices: boolean; 
    updateData: (newTransaction: Transaction, updatedUsers: User[]) => void;
}