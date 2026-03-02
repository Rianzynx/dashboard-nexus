import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Transaction, User } from '../types';
import { mockTransactions } from '../mocks/transactions';

interface TransactionContextData {
    users: User[];
    allTransactions: Transaction[];
    updateData: (newTransaction: Transaction, updatedUsers: User[]) => void;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionProvider = ({ children, initialUsers }: { children: ReactNode, initialUsers: User[] }) => {
    // Carrega usuários do LocalStorage ou do mock inicial
    const [users, setUsers] = useState<User[]>(() => {
        const saved = localStorage.getItem('@nexus:users');
        return saved ? JSON.parse(saved) : initialUsers;
    });

    // Carrega TODAS as transações (Depósitos + Saques) para a Dashboard
    const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
        const d = JSON.parse(localStorage.getItem('@nexus:transactions:DEPOSIT') || '[]');
        const w = JSON.parse(localStorage.getItem('@nexus:transactions:WITHDRAW') || '[]');

        const combined = [...d, ...w];

        // Se a lista estiver vazia (localStorage limpo) retorna o mockTransactions 
        if (combined.length === 0) {
            return mockTransactions; 
        }

        return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    const updateData = (newTransaction: Transaction, updatedUsers: User[]) => {
        // Atualiza Estados
        setUsers(updatedUsers);
        setAllTransactions(prev => [newTransaction, ...prev]);

        // Persiste no LocalStorage
        localStorage.setItem('@nexus:users', JSON.stringify(updatedUsers));

        const storageKey = `@nexus:transactions:${newTransaction.type}`;
        const currentTypeStorage = JSON.parse(localStorage.getItem(storageKey) || '[]');
        localStorage.setItem(storageKey, JSON.stringify([newTransaction, ...currentTypeStorage]));
    };

    return (
        <TransactionContext.Provider value={{ users, allTransactions, updateData }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => useContext(TransactionContext);