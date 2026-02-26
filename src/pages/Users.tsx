import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { mockUsers } from "../mocks/users";
import type { UserStatus } from "../types";

const Users: React.FC = () => {
    const [search, setSearch] = useState("");


    {/* Lógica de filtragem e paginação */ }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div className="flex min-h-screen bg-nexus-dark">
            {/* Sidebar */}
            <Sidebar />


            <main className="flex-1 p-8">
                {/* Header com busca*/}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Usuarios</h1>
                        <p className="text-slate-500 text-sm">Controlque e pesquise usuarios por aqui.</p>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Digite um nome ou email..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1)
                            }}
                            className="w-full md:w-full bg-white/10 mt-4 p-3 rounded-lg bg-[#0b0c21]/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#2badca]/50"
                        />
                    </div>
                </header>

                <div className="flex gap-2 mb-6">
                    {['ALL', 'ACTIVE', 'PENDING', 'BLOCKED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setStatusFilter(status as any);
                                setCurrentPage(1); // Sempre reseta a página ao filtrar
                            }}
                            className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border ${statusFilter === status
                                ? 'bg-red-900/20 border-red-500/50 text-white'
                                : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                                }`}
                        >
                            {status === 'ALL' ? 'TODOS' : status}
                        </button>
                    ))}
                </div>

                {/* Tabela de usuarios */}
                <div className="bg-[#0b0c21]/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0b0c21]/50 text-slate-500 text-sm uppercase tracking-wider">
                                <th className="px-6 py-3 w-64 border-b border-white/10">Nome</th>
                                <th className="px-6 py-3 border-b border-white/10">Email</th>
                                <th className="px-6 py-3 border-b border-white/10">Status</th>
                                <th className="px-6 py-3 border-b border-white/10">Criado em</th>
                                <th className="px-6 py-3 border-b border-white/10">Ultima atividade</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5">
                            {currentUsers.map(user => (
                                <tr key={user.id} className="hover:bg-[#0b0c21]/50 transition-colors cursor-default">
                                    <td className="px-6 py-4 w-64">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium group-hover:text-red-500 transition-colors">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium group-hover:text-red-500 transition-colors">
                                                {user.email}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${user.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' :
                                            user.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' :
                                                'bg-red-500/10 text-red-500'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(user.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>

                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(user.lastActivity).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>


                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {/* Paginação */}
                    <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
                        <p className="text-slate-500 text-xs">
                            Mostrando <span className="text-white">{currentUsers.length}</span> de <span className="text-white">{filteredUsers.length}</span> usuários
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-xs font-bold text-slate-400 bg-white/5 rounded-lg hover:bg-red-900/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                            >
                                Anterior
                            </button>

                            <div className="flex items-center px-4 text-xs text-white font-mono">
                                {currentPage} / {totalPages || 1}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="px-3 py-1 text-xs font-bold text-slate-400 bg-white/5 rounded-lg hover:bg-red-900/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                            >
                                Próxima
                            </button>
                        </div>


                    </div>
                </div>

            </main>
        </div>
    );
}

export default Users;