import React, { useEffect, useState } from "react";
import { mockUsers } from "../mocks/users";
import type { UserStatus } from "../types";

import * as Icon from '../components/icons';
import Layout from "../components/Layout";

const Users: React.FC = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [isOpen, setIsOpen] = React.useState(false);

    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');
    const [sortBy, setSortBy] = useState<'name' | 'newest'>('name');

    const [tempStatus, setTempStatus] = useState(statusFilter);
    const [tempSort, setTempSort] = useState(sortBy);

    useEffect(() => {
        if (showFilters) {
            setTempStatus(statusFilter);
            setTempSort(sortBy);
        }
    }, [showFilters]);

    // Lógica de filtragem 
    const filteredUsers = mockUsers
        .filter(user => {
            const matchesSearch =
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            return 0;
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <Layout>
            {/* Header Responsivo */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Usuários</h1>
                    <p className="text-slate-500 text-sm">Gerencie e monitore a base de membros.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative">
                    {/* Botão de Filtros */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center gap-2 p-3 px-5 rounded-xl border text-sm font-bold transition-all
                                    ${showFilters ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                    >
                        <span>{showFilters ? '✕' : '⚙'}</span>
                        <span>Filtros</span>
                    </button>

                    {/* Busca */}
                    <div className="relative flex-1 sm:min-w-[280px]">
                        <input
                            type="text"
                            placeholder="Pesquisar por nome ou email..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="w-full bg-[#0b0c21]/50 border border-white/10 p-3 pl-11 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-sm">🔍</span>
                    </div>

                    {/* Popover de Filtros */}
                    {showFilters && (
                        <>
                            {/* Overlay com blur */}
                            <div className="fixed inset-0 z-10 backdrop-blur-[2px] bg-black/30" onClick={() => setShowFilters(false)} />

                            <div className=" fixed inset-x-4 top-[15%] z-10 w-auto
                                        lg:absolute lg:top-full lg:right-0 lg:inset-x-auto lg:mt-4 lg:w-80 lg:z-50
                                         bg-[#0b0c21] border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200"
                            >
                                <div className="space-y-6">
                                    {/* Título apenas mobile */}
                                    <div className="lg:hidden flex justify-between items-center mb-2">
                                        <h3 className="text-white font-bold">Filtrar Usuários</h3>
                                        <button onClick={() => setShowFilters(false)} className="text-slate-500">✕</button>
                                    </div>

                                    {/* Seção: Status da Conta */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Icon.ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Status da Conta</label>
                                        </div>

                                        <div className="relative">
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className={`w-full bg-white/[0.03] border ${isOpen ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-white/10'} text-slate-200 text-xs rounded-xl p-3.5 flex justify-between items-center transition-all duration-200 hover:bg-white/[0.06]`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${tempStatus === 'ACTIVE' ? 'bg-green-500' :
                                                        tempStatus === 'BLOCKED' ? 'bg-red-500' :
                                                            tempStatus === 'PENDING' ? 'bg-yellow-500' : 'bg-blue-500'
                                                        }`} />
                                                    {tempStatus === 'ALL' ? 'Todos os Status' :
                                                        tempStatus === 'ACTIVE' ? 'Ativos' :
                                                            tempStatus === 'PENDING' ? 'Pendentes' : 'Bloqueados'}
                                                </span>
                                                <Icon.ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {isOpen && (
                                                <div className="absolute z-50 w-full mt-2 bg-[#0d0e26] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                                                    {[
                                                        { value: 'ALL', label: 'Todos os Status', color: 'bg-blue-500' },
                                                        { value: 'ACTIVE', label: 'Ativos', color: 'bg-green-500' },
                                                        { value: 'PENDING', label: 'Pendentes', color: 'bg-yellow-500' },
                                                        { value: 'BLOCKED', label: 'Bloqueados', color: 'bg-red-500' },
                                                    ].map((opt) => (
                                                        <div
                                                            key={opt.value}
                                                            onClick={() => {
                                                                setTempStatus(opt.value as any);
                                                                setIsOpen(false);
                                                            }}
                                                            className="px-4 py-3 text-xs text-slate-400 cursor-pointer transition-all hover:bg-white/[0.05] hover:text-white flex items-center gap-3"
                                                        >
                                                            <span className={`w-1.5 h-1.5 rounded-full ${opt.color}`} />
                                                            {opt.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Seção: Ordenação */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Icon.SortAsc className="w-3.5 h-3.5 text-blue-500" />
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                                                Ordenar por
                                            </label>
                                        </div>

                                        <div className="flex p-1 bg-white/[0.03] border border-white/10 rounded-xl gap-1">
                                            {[
                                                { id: 'name', label: 'Nome' },
                                                { id: 'newest', label: 'Recentes' }
                                            ].map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setTempSort(option.id as any)}
                                                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${tempSort === option.id
                                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Botão Aplicar */}
                                    <button
                                        onClick={() => {
                                            setStatusFilter(tempStatus);
                                            setSortBy(tempSort);
                                            setCurrentPage(1);
                                            setShowFilters(false);
                                        }}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                                    >
                                        Aplicar Filtros
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </header>

            {/* Tabela */}
            <div className="bg-[#0b0c21]/40 border border-white/5 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">

                <div className="lg:hidden flex items-center justify-between px-6 py-3 bg-nexus-dark border-b border-white/5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Lista de Usuários</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-blue-400 animate-pulse">Deslize para ver mais</span>
                        <span className="text-blue-400">→</span>
                    </div>
                </div>

                {/* Container com scroll */}
                <div className="overflow-x-auto custom-scrollbar scroll-smooth">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/[0.02] text-slate-500 text-[11px] uppercase tracking-[0.1em] font-black">
                                <th className="px-6 py-3 border-b border-white/5">Nome do Usuário</th>
                                <th className="px-6 py-3 border-b border-white/5">E-mail</th>
                                <th className="px-6 py-3 border-b border-white/5 text-center">Status</th>
                                <th className="px-6 py-3 border-b border-white/5">Data de Cadastro</th>
                                <th className="px-6 py-3 border-b border-white/5">Última Atividade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {currentUsers.map(user => (
                                <tr key={user.id} className="hover:bg-white/[0.03] transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">{user.name}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-slate-400 text-sm">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black border ${user.status === 'ACTIVE' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                            user.status === 'PENDING' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                                'bg-red-500/10 border-red-500/20 text-red-500'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400 text-xs whitespace-nowrap">
                                        {new Date(user.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-5 text-slate-500 text-xs whitespace-nowrap">
                                        {new Date(user.lastActivity).toLocaleDateString('pt-BR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="px-6 py-5 bg-black/20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <p className="text-slate-500 text-xs font-medium order-2 sm:order-1">
                        Exibindo <span className="text-white font-bold">{currentUsers.length}</span> de <span className="text-white font-bold">{filteredUsers.length}</span> resultados
                    </p>

                    <div className="flex items-center gap-3 order-1 sm:order-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 px-5 text-xs font-black text-slate-400 bg-white/5 rounded-xl disabled:opacity-20 transition-all hover:bg-white/10 border border-white/5 hover:text-white"
                        >
                            VOLTAR
                        </button>
                        <span className="text-xs text-blue-500 font-mono bg-blue-500/5 border border-blue-500/20 px-4 py-2.5 rounded-xl">
                            {currentPage} <span className="text-slate-600 mx-1">/</span> {totalPages || 1}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-2.5 px-5 text-xs font-black text-slate-400 bg-white/5 rounded-xl disabled:opacity-20 transition-all hover:bg-white/10 border border-white/5 hover:text-white"
                        >
                            PRÓXIMO
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Users;