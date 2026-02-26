import type { User } from '../types';

export const mockUsers: User[] = [
    {
        id: '1', name: 'John Doe', email: 'john.doe@gmail.com', status: 'ACTIVE',
        createdAt: '2025-12-15', lastActivity: '2026-02-26',
        balance: { BRL: 2500, BTC: 0.005, ETH: 0.15, USDT: 100 }
    },
    {
        id: '2', name: 'Maria Silva', email: 'maria.silva@gmail.com', status: 'PENDING',
        createdAt: '2026-01-10', lastActivity: '2026-02-20',
        balance: { BRL: 10500, BTC: 0, ETH: 0, USDT: 50 }
    },
    {
        id: '3', name: 'Carlos Weber', email: 'carlos.weber@gmail.com', status: 'BLOCKED',
        createdAt: '2025-11-20', lastActivity: '2026-01-05',
        balance: { BRL: 0, BTC: 0.1, ETH: 2, USDT: 0 }
    },
    {
        id: '4', name: 'Ana Souza', email: 'ana.souza@gmail.com', status: 'ACTIVE',
        createdAt: '2026-02-01', lastActivity: '2026-02-26',
        balance: { BRL: 500, BTC: 0, ETH: 0, USDT: 1000 }
    },
    {
        id: '5', name: 'Lucas Pires', email: 'lucas.pires@gmail.com', status: 'ACTIVE',
        createdAt: '2025-09-12', lastActivity: '2026-02-25',
        balance: { BRL: 1200, BTC: 0.02, ETH: 0.5, USDT: 250 }
    },
    {
        id: '6', name: 'Beatriz Lima', email: 'beatriz.lima@gmail.com', status: 'PENDING',
        createdAt: '2026-02-15', lastActivity: '2026-02-16',
        balance: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 }
    },
    {
        id: '7', name: 'Ricardo Ohara', email: 'ricardo.ohara@gmail.com', status: 'ACTIVE',
        createdAt: '2025-08-30', lastActivity: '2026-02-24',
        balance: { BRL: 50000, BTC: 1.5, ETH: 10, USDT: 5000 }
    },
    {
        id: '8', name: 'Fernanda Montenegro', email: 'f.montenegro@gmail.com', status: 'ACTIVE',
        createdAt: '2026-01-01', lastActivity: '2026-02-26',
        balance: { BRL: 3200, BTC: 0, ETH: 0.1, USDT: 15 }
    },
    {
        id: '9', name: 'Roberto Carlos', email: 'roberto.carlos@gmail.com', status: 'BLOCKED',
        createdAt: '2025-12-25', lastActivity: '2026-01-01',
        balance: { BRL: 100000, BTC: 0, ETH: 0, USDT: 0 }
    },
    {
        id: '10', name: 'Julia Roberts', email: 'julia.roberts@gmail.com', status: 'ACTIVE',
        createdAt: '2026-02-10', lastActivity: '2026-02-26',
        balance: { BRL: 890, BTC: 0.001, ETH: 0, USDT: 400 }
    }
];