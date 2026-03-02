import React from "react";
import { useUsers } from "../hooks/useUsers";
import * as Icon from '../components/Icons';

const Users: React.FC = () => {
    const {
        currentUsers,
        totalResults,
        search,
        currentPage,
        totalPages,
        showFilters,
        tempStatus,
        tempSort,
        setShowFilters,
        setTempStatus,
        setTempSort,
        setCurrentPage,
        handleSearch,
        applyFilters
    } = useUsers(8);

    const [isSelectOpen, setIsSelectOpen] = React.useState(false);

    return (
        <>
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Usuários</h1>
                    <p className="text-slate-500 text-sm">Gerencie e monitore a base de membros.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative">
                    {/* Botão de Filtros Estilizado */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center gap-2 p-3 px-5 rounded-2xl border text-sm font-bold transition-all
                            ${showFilters
                                ? 'bg-slate-900 dark:bg-white/10 border-slate-900 dark:border-white/20 text-white'
                                : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm'}`}
                    >
                        <span>{showFilters ? '✕' : '⚙'}</span>
                        <span>Filtros</span>
                    </button>

                    {/* Input de Pesquisa */}
                    <div className="relative flex-1 sm:min-w-[280px]">
                        <input
                            type="text"
                            placeholder="Pesquisar por nome ou email..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/30 p-3 pl-11 rounded-2xl text-slate-900 dark:text-white text-sm outline-none transition-all shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-slate-200 dark:focus:ring-white/5"
                        />
                        <Icon.Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 text-slate-500" />
                    </div>

                    {showFilters && (
                        <>
                            {/* Overlay com blur */}
                            <div className="fixed inset-0 z-10 backdrop-blur-[2px] bg-black/20 dark:bg-black/40" onClick={() => setShowFilters(false)} />

                            <div className="fixed inset-x-4 top-[15%] z-20 lg:absolute lg:top-full lg:right-40 lg:inset-x-auto lg:mt-4 lg:w-80 bg-white dark:bg-nexus-pBlack border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">                                <div className="space-y-6">
                                {/* Título Mobile */}
                                <div className="lg:hidden flex justify-between items-center mb-2">
                                    <h3 className="text-slate-900 dark:text-white font-black">Filtrar Usuários</h3>
                                    <button onClick={() => setShowFilters(false)} className="text-slate-400">✕</button>
                                </div>

                                {/* Seção: Status */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Icon.ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                                        <label className="text-[10px] uppercase tracking-widest text-black/60 dark:text-slate-500 font-black">Status da Conta</label>                                    </div>

                                    <div className="relative">
                                        <button
                                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                                            className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs rounded-xl p-3.5 flex justify-between items-center transition-all"                                        >
                                            <span className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] ${tempStatus === 'ACTIVE' ? 'bg-green-500 shadow-green-500/40' :
                                                    tempStatus === 'PENDING' ? 'bg-yellow-500 shadow-yellow-500/40' :
                                                        tempStatus === 'BLOCKED' ? 'bg-red-500 shadow-red-500/40' : 'bg-black/50'
                                                    }`} />
                                                {tempStatus === 'ALL' ? 'Todos os Status' :
                                                    tempStatus === 'ACTIVE' ? 'Ativos' :
                                                        tempStatus === 'PENDING' ? 'Pendentes' : 'Bloqueados'}
                                            </span>
                                            <Icon.ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isSelectOpen && (
                                            <div className="absolute z-50 w-full mt-2 bg-gray-500 dark:bg-nexus-dark border border-black/10 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                {[
                                                    { id: 'ALL', label: 'Todos os Status', color: 'bg-white' },
                                                    { id: 'ACTIVE', label: 'Ativos', color: 'bg-green-500' },
                                                    { id: 'PENDING', label: 'Pendentes', color: 'bg-yellow-500' },
                                                    { id: 'BLOCKED', label: 'Bloqueados', color: 'bg-red-500' }
                                                ].map((opt) => (
                                                    <div
                                                        key={opt.id}
                                                        onClick={() => { setTempStatus(opt.id as any); setIsSelectOpen(false); }}
                                                        className="px-4 py-3 text-xs text-white/90 dark:text-slate-400 cursor-pointer transition-all hover:bg-white/[0.05] hover:text-white flex items-center gap-3"
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
                                        <Icon.SortAsc className="w-3.5 h-3.5 text-slate-500" />
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Ordenar por</label>
                                    </div>
                                    <div className="flex p-1 bg-black/[0.1] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl gap-1">
                                        {[{ id: 'name', label: 'Nome' }, { id: 'newest', label: 'Recentes' }].map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setTempSort(opt.id as any)}
                                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${tempSort === opt.id ? 'bg-black/30 dark:bg-white/10 text-slate-700 dark:text-white shadow-lg' : 'text-slate-800 dark:text-slate-500 hover:text-slate-400 dark:hover:text-slate-300'
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Botão Aplicar */}
                                <button
                                    onClick={applyFilters}
                                    className="w-full py-4 bg-slate-700/80 dark:bg-red-700/80 hover:bg-red-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-red-900/20"
                                >
                                    Aplicar Filtros
                                </button>
                            </div>
                            </div>
                        </>
                    )}
                </div>
            </header>


            {/* TABELA CONTAINER */}
            <div className="bg-slate-100 dark:bg-white/[0.02] border border-slate-300 dark:border-white/5 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-stone-700/40 dark:bg-white/[0.02] text-white dark:text-slate-500 text-[11px] uppercase tracking-[0.1em] font-black">
                                <th className="px-6 py-3 border-b border-slate-100 dark:border-white/5">Usuário</th>
                                <th className="px-6 py-3 border-b border-slate-100 dark:border-white/5">E-mail</th>
                                <th className="px-6 py-3 border-b border-slate-100 dark:border-white/5">Status</th>
                                <th className="px-6 py-3 border-b border-slate-100 dark:border-white/5">Cadastro</th>
                                <th className="px-6 py-3 border-b border-slate-100 dark:border-white/5">Atividade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300 dark:divide-white/5">
                            {currentUsers.map(user => (
                                <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all">
                                    <td className="px-6 py-5">
                                        <span className="text-slate-600 dark:text-white font-bold text-sm tracking-tight">{user.name}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider
                                                ${user.status === 'ACTIVE'
                                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-500'
                                                    : user.status === 'PENDING'
                                                        ? 'bg-amber-50 dark:bg-yellow-500/10 border-amber-200 dark:border-yellow-500/20 text-amber-600 dark:text-yellow-500'
                                                        : 'bg-rose-50 dark:bg-red-500/10 border-rose-200 dark:border-red-500/20 text-rose-600 dark:text-red-500'}`}>
                                                {user.status === 'ACTIVE' && <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                                                {user.status === 'ACTIVE' ? 'Ativo' : user.status === 'PENDING' ? 'Pendente' : 'Bloqueado'}
                                            </span>

                                            {user.status !== 'ACTIVE' && (
                                                <span className="text-[9px] text-slate-500 font-medium flex items-center gap-1">
                                                    <Icon.Lock className="w-2.5 h-2.5 opacity-50" />
                                                    Financeiro Restrito
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400 text-xs">
                                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-5 text-slate-500 text-xs">
                                        {new Date(user.lastActivity).toLocaleDateString('pt-BR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINAÇÃO */}
                <div className="px-6 py-5 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">
                        Mostrando <span className="text-slate-900 dark:text-white">{currentUsers.length}</span> de {totalResults}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 px-6 text-[10px] font-black text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
                        >
                            VOLTAR
                        </button>
                        <div className="flex items-center justify-center min-w-[60px] h-10 text-xs font-black text-slate-900 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
                            {currentPage} / {totalPages || 1}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-2.5 px-6 text-[10px] font-black text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
                        >
                            PRÓXIMO
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;