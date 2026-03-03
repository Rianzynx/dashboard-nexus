import { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { ASSET_CONFIG } from '../config/assets';
import type { AssetType, Transaction } from '../types';
import { useTransactionContext } from '../contexts/TransactionContext';

type TransactionType = 'DEPOSIT' | 'WITHDRAW';

export const useTransactionForm = (type: TransactionType) => {
    const { users, updateData, allTransactions } = useTransactionContext();

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedAsset, setSelectedAsset] = useState<AssetType>('BRL');
    const [amount, setAmount] = useState<string>('');
    const [observation, setObservation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const resetForm = () => {
        setAmount('');
        setObservation('');
    };

    const transactions = useMemo(() =>
        allTransactions.filter(t => t.type === type),
        [allTransactions, type]);

    const currentUser = useMemo(() =>
        users.find(u => u.id === selectedUserId),
        [selectedUserId, users]);

    const config = ASSET_CONFIG[selectedAsset];
    const availableBalance = currentUser ? (currentUser.balance[selectedAsset] || 0) : 0;
    const isOverBalance = type === 'WITHDRAW' && Number(amount) > (availableBalance + 0.000000000001);

    const executeTransaction = () => {
        const targetUser = users.find(u => u.id === selectedUserId);

        if (!targetUser) {
            toast.error("Usuário não encontrado.");
            return;
        }

        if (targetUser.status === 'BLOCKED') {
            toast.error("Operação negada: Este usuário está BLOQUEADO.");
            return;
        }

        if (targetUser.status === 'PENDING') {
            toast.error("Operação negada: Este usuário ainda está PENDENTE.");
            return;
        }


        const value = Number(amount);
        if (type === 'WITHDRAW' && value > (availableBalance + 0.000000000001)) {
            toast.error("Saldo insuficiente.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const multiplier = type === 'DEPOSIT' ? 1 : -1;

            const updatedUsers = users.map(u => u.id === selectedUserId ? {
                ...u,
                balance: { ...u.balance, [selectedAsset]: (u.balance[selectedAsset] || 0) + (value * multiplier) }
            } : u);

            const newTransaction: Transaction = {
                id: `tx-${Date.now()}`,
                userId: selectedUserId,
                userName: targetUser?.name || 'Desconhecido',
                type: type,
                amount: value,
                asset: selectedAsset,
                date: new Date().toISOString(),
                observation: observation || undefined
            };

            updateData(newTransaction, updatedUsers);


            setObservation('');
            setIsLoading(false);
            setShowSuccess(true);
            resetForm();
        }, 1000);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Number(amount) <= 0) {
            toast.error("Insira um valor válido.");
            return;
        }
        if (!isOverBalance) {
            setIsConfirmModalOpen(true);
        }
    };

    const setPercentage = (pct: number) => {
        const val = (availableBalance * pct).toFixed(selectedAsset === 'BRL' ? 2 : 8);
        setAmount(Number(val).toString());
    };

    const formatValue = (val: number, asset: AssetType) => {
        const precision = ASSET_CONFIG[asset].precision;
        if (asset === 'BRL') {
            return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        return val.toFixed(precision) + ' ' + asset;
    };

    const [isPending, setIsPending] = useState(false);

    const handleConfirm = async () => {
        setIsPending(true);
        try {
            await executeTransaction();
            setIsConfirmModalOpen(false);
        } catch (error) {
            console.error("Erro ao processar:", error);
        } finally {
            setIsPending(false);
        }
    };

    return {
        users,
        selectedUserId, setSelectedUserId,
        selectedAsset, setSelectedAsset,
        amount, setAmount,
        observation, setObservation,
        isLoading,
        isConfirmModalOpen, setIsConfirmModalOpen,
        showSuccess,
        currentUser,
        config,
        availableBalance,
        isOverBalance,
        executeTransaction,
        handleFormSubmit,
        transactions,
        setPercentage,
        formatValue,
        isPending,
        handleConfirm,
        setShowSuccess
    };
};