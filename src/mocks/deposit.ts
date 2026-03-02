import type { Transaction } from '../types/index'; 


export const initialTransactions: Transaction[] = [
    {
        id: 'tx-001',
        userId: '1',
        userName: 'Carlos Oliveira',
        type: 'DEPOSIT',
        asset: 'BRL',
        amount: 5000,
        date: new Date().toISOString(),
        observation: 'Depósito inicial de teste'
    }
];