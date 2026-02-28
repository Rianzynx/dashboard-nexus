import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { mockUsers } from "../mocks/users";
import type { UserStatus } from "../types";

const Users: React.FC = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');
    const [sortBy, setSortBy] = useState<'name' | 'newest'>('name');

    // Lógica de filtragem permanecem iguais
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
        <div className="flex h-screen bg-nexus-dark overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-white/5">
                <Sidebar />
            </aside>

            {/* Sidebar Mobile  */}
            <div className="lg:hidden">
                <Sidebar />
            </div>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 md:p-8 pt-24 lg:pt-10 max-w-[1600px] mx-auto w-full">

                    {/* Header Responsivo */}
                    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Usuários</h1>
                            <p className="text-slate-500 text-sm mt-1">Gerencie e monitore a base de membros do Nexus.</p>
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
                                    <div className="fixed inset-0 z-10" onClick={() => setShowFilters(false)} />
                                    <div className="absolute top-full mt-3 left-0 right-0 sm:left-auto sm:w-72 z-20 bg-[#0d0e26] border border-white/10 rounded-2xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="space-y-5">
                                            <div>
                                                <label className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-black mb-2.5 block">Status da Conta</label>
                                                <select
                                                    value={statusFilter}
                                                    onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
                                                    className="w-full bg-white/5 border border-white/10 text-slate-300 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
                                                >
                                                    <option value="ALL">Todos os Status</option>
                                                    <option value="ACTIVE">Ativos</option>
                                                    <option value="PENDING">Pendentes</option>
                                                    <option value="BLOCKED">Bloqueados</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-black mb-2.5 block">Ordenar Listagem</label>
                                                <select
                                                    value={sortBy}
                                                    onChange={(e) => setSortBy(e.target.value as any)}
                                                    className="w-full bg-white/5 border border-white/10 text-slate-300 text-xs rounded-lg p-2.5 outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
                                                >
                                                    <option value="name">Nome (A-Z)</option>
                                                    <option value="newest">Mais Recentes</option>
                                                </select>
                                            </div>
                                            <button
                                                onClick={() => setShowFilters(false)}
                                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-900/20"
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
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-white/[0.02] text-slate-500 text-[11px] uppercase tracking-[0.1em] font-black">
                                        <th className="px-6 py-5 border-b border-white/5">Nome do Usuário</th>
                                        <th className="px-6 py-5 border-b border-white/5">E-mail</th>
                                        <th className="px-6 py-5 border-b border-white/5 text-center">Status</th>
                                        <th className="px-6 py-5 border-b border-white/5">Data de Cadastro</th>
                                        <th className="px-6 py-5 border-b border-white/5">Última Atividade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {currentUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">{user.name}</span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-slate-400 text-sm italic">
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
                </div>
            </main>
        </div>
    );
}

export default Users;