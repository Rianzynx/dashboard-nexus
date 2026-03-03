import { useMemo } from 'react';
import { useTransactionContext } from '../contexts/TransactionContext';
import * as Icons from '../components/Icons';
import { useAssetBalances } from './useAssetBalances';
import { usePrices } from "./usePrices"
import React from 'react';

export const useIndicators = () => {
    const { users, allTransactions } = useTransactionContext();
    const { totalEquity, isLoadingPrices } = useAssetBalances();
    const { priceMap } = usePrices();

    const indicators = useMemo(() => {
        const convertToBRL = (t: any) => {
            const amount = Number(t.amount) || 0;
            if (t.asset === 'BRL') return amount;

            const price = priceMap[t.asset.toLowerCase()] ?? 0;
            return amount * price * 5.10;
        };

        const totalDeposit = allTransactions
            .filter(t => t.type === 'DEPOSIT')
            .reduce((acc, curr) => acc + convertToBRL(curr), 0);

        const totalWithdraw = allTransactions
            .filter(t => t.type === 'WITHDRAW')
            .reduce((acc, curr) => acc + convertToBRL(curr), 0);

        const activeUsers = users.filter(u => u.status === 'ACTIVE').length;

        return [
            {
                id: 1,
                label: "Total Depositado",
                value: totalDeposit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                color: "bg-slate-500/10 text-slate-500",
                icon: React.createElement(Icons.Deposit, { className: "w-6 h-6" })
            },
            {
                id: 2,
                label: "Total Sacado",
                value: totalWithdraw.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                color: "bg-slate-500/10 text-slate-500",
                icon: React.createElement(Icons.Withdraw, { className: "w-6 h-6" })
            },
            {
                id: 3,
                label: "Usuários Ativos",
                value: activeUsers.toString(),
                color: "bg-slate-500/10 text-slate-500",
                icon: React.createElement(Icons.Users, { className: "w-6 h-6" })
            },
            {
                id: 'equity',
                label: "Patrimônio sob Gestão",
                value: isLoadingPrices ? 'Carregando...' : totalEquity.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                color: "bg-slate-500/10 text-slate-500",
                icon: React.createElement(Icons.PiggyBank, { className: "w-6 h-6" })
            },
        ];
    }, [users, allTransactions, totalEquity, isLoadingPrices, priceMap]);

    return { indicators };
};