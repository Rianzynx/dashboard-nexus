import type { User } from '../types';

export const mockUsers: User[] = [
    {
        id: '1', name: 'John Doe', email: 'john.doe@gmail.com', status: 'ACTIVE',
        createdAt: '2025-12-15', lastActivity: '2026-02-26',
        balance: {
            BRL: 15450.50,
            BTC: 0.005,
            ETH: 1.25,
            USDT: 500,
            SOL: 45.8,
            ADA: 0
        }
    },
    {
        id: '2', name: 'Maria Silva', email: 'maria.silva@gmail.com', status: 'PENDING',
        createdAt: '2026-01-10', lastActivity: '2026-02-20',
        balance: {
            BRL: 0,
            BTC: 0,
            ETH: 0,
            USDT: 10.50,
            SOL: 0,
            ADA: 150.25
        }
    },
    {
        id: '3', name: 'Carlos Weber', email: 'carlos.weber@gmail.com', status: 'BLOCKED',
        createdAt: '2025-11-20', lastActivity: '2026-01-05',
        balance: {
            BRL: 2500,
            BTC: 0.12,
            ETH: 0,
            USDT: 0,
            SOL: 0,
            ADA: 0
        }
    },
    {
        id: '4', name: 'Ana Souza', email: 'ana.souza@gmail.com', status: 'ACTIVE',
        createdAt: '2026-02-01', lastActivity: '2026-02-26',
        balance: {
            BRL: 850.75,
            BTC: 0,
            ETH: 0.5,
            USDT: 1200,
            SOL: 12.4,
            ADA: 5000
        }
    },
    {
        id: '5', name: 'Lucas Pires', email: 'lucas.pires@gmail.com', status: 'ACTIVE',
        createdAt: '2025-09-12', lastActivity: '2026-02-25',
        balance: {
            BRL: 120,
            BTC: 0.00045,
            ETH: 0.01,
            USDT: 5,
            SOL: 0.85,
            ADA: 10
        }
    },
    {
        id: '6', name: 'Beatriz Lima', email: 'beatriz.lima@gmail.com', status: 'PENDING',
        createdAt: '2026-02-15', lastActivity: '2026-02-16',
        balance: {
            BRL: 0,
            BTC: 0,
            ETH: 0,
            USDT: 0,
            SOL: 0,
            ADA: 0
        }
    },
    {
        id: '7', name: 'Ricardo Ohara', email: 'ricardo.ohara@gmail.com', status: 'ACTIVE',
        createdAt: '2025-08-30', lastActivity: '2026-02-24',
        balance: {
            BRL: 50000,
            BTC: 2.5,
            ETH: 15.0,
            USDT: 25000,
            SOL: 350,
            ADA: 120000
        }
    },
    {
        id: '8', name: 'Fernanda Montenegro', email: 'f.montenegro@gmail.com', status: 'ACTIVE',
        createdAt: '2026-01-01', lastActivity: '2026-02-26',
        balance: {
            BRL: 3200.40,
            BTC: 0,
            ETH: 0,
            USDT: 450,
            SOL: 5.5,
            ADA: 0
        }
    },
    {
        id: '9', name: 'Roberto Carlos', email: 'roberto.carlos@gmail.com', status: 'BLOCKED',
        createdAt: '2025-12-25', lastActivity: '2026-01-01',
        balance: {
            BRL: 1.99,
            BTC: 0,
            ETH: 0,
            USDT: 0,
            SOL: 0,
            ADA: 0
        }
    },
    {
        id: '10', name: 'Julia Roberts', email: 'julia.roberts@gmail.com', status: 'ACTIVE',
        createdAt: '2026-02-10', lastActivity: '2026-02-26',
        balance: {
            BRL: 12500,
            BTC: 0.015,
            ETH: 2.8,
            USDT: 300,
            SOL: 0,
            ADA: 450
        }
    }
];