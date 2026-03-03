import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Transaction, User, TransactionContextData } from '../types'; 
import { mockTransactions } from '../mocks/transactions';
import { useConversion } from '../hooks/useConversion'; 


const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionProvider = ({ children, initialUsers }: { children: ReactNode, initialUsers: User[] }) => {
    
    const { assets, isLoading } = useConversion();

    const [users, setUsers] = useState<User[]>(() => {
        const saved = localStorage.getItem('@nexus:users');
        return saved ? JSON.parse(saved) : initialUsers;
    });

    const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
        const d = JSON.parse(localStorage.getItem('@nexus:transactions:DEPOSIT') || '[]');
        const w = JSON.parse(localStorage.getItem('@nexus:transactions:WITHDRAW') || '[]');
        const combined = [...d, ...w];

        if (combined.length === 0) {
            return mockTransactions; 
        }
        return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    const updateData = (newTransaction: Transaction, updatedUsers: User[]) => {
        setUsers(updatedUsers);
        setAllTransactions(prev => [newTransaction, ...prev]);
        localStorage.setItem('@nexus:users', JSON.stringify(updatedUsers));

        const storageKey = `@nexus:transactions:${newTransaction.type}`;
        const currentTypeStorage = JSON.parse(localStorage.getItem(storageKey) || '[]');
        localStorage.setItem(storageKey, JSON.stringify([newTransaction, ...currentTypeStorage]));
    };

    return (
        <TransactionContext.Provider value={{ 
            users, 
            allTransactions, 
            prices: assets, 
            isLoadingPrices: isLoading,
            updateData 
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => useContext(TransactionContext);