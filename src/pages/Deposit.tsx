import React from 'react';
import * as Icon from '../components/Icons';
import { ASSET_CONFIG } from '../config/assets';
import { useTransactionForm } from '../hooks/useTransactionForm';
import { OptionSelect } from '../components/OptionSelect';
import type { AssetType } from '../types';

const Deposit: React.FC = () => {
    const {
        users,
        selectedUserId, setSelectedUserId,
        selectedAsset, setSelectedAsset,
        amount, setAmount,
        observation, setObservation,
        isLoading,
        isConfirmModalOpen, setIsConfirmModalOpen,
        showSuccess,
        executeTransaction,
        currentUser,
        transactions,
        setShowSuccess
    } = useTransactionForm('DEPOSIT');

    return (
        <>
            <header className="mb-10">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Depósito</h1>
                <p className="text-slate-500 text-sm">Administração de saldos e entradas manuais.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORMULÁRIO PRINCIPAL */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-nexus-white dark:bg-nexus-offBlack/30 rounded-2xl p-6 border border-slate-300 dark:border-white/10 space-y-6 transition-colors shadow-lg dark:shadow-black/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* SELECT DE USUÁRIOS */}
                            <OptionSelect
                                label="Usuário Destino"
                                placeholder="Selecione um usuário..."
                                value={selectedUserId}
                                onChange={setSelectedUserId}
                                options={users
                                    .filter(u => u.status === 'ACTIVE')
                                    .map(u => ({
                                        id: u.id,
                                        label: u.name,
                                        sublabel: u.email
                                    }))
                                }
                            />

                            {/* SELECT DE ATIVOS  */}
                            <OptionSelect
                                label="Ativo"
                                value={selectedAsset}
                                onChange={(val) => setSelectedAsset(val as AssetType)}
                                options={Object.entries(ASSET_CONFIG).map(([ticker, cfg]) => ({
                                    id: ticker,
                                    label: `${ticker} - ${cfg.name}`,
                                    icon: <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                                }))}
                            />

                            {/* Valor */}
                            <div>
                                <label className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 px-1">Valor do Depósito</label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-slate-400 dark:focus:border-slate-500/50 transition-all placeholder:text-slate-400"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Observação */}
                        <div>
                            <label className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 px-1">Observação (Opcional)</label>
                            <textarea
                                className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-slate-400 dark:focus:border-slate-500/50 transition-all resize-none placeholder:text-slate-400"
                                rows={3}
                                placeholder="Ex: Referente a transferência bancária..."
                                value={observation}
                                onChange={(e) => setObservation(e.target.value)}
                            />
                        </div>

                        {/* Botão de Gatilho do Modal */}
                        <button
                            type="button"
                            disabled={isLoading || !selectedUserId || Number(amount) <= 0}
                            onClick={() => {
                                setShowSuccess(false);
                                setIsConfirmModalOpen(true);
                            }}
                            className="w-full bg-slate-900 dark:bg-red-600/40 hover:bg-slate-800 dark:hover:bg-red-600 border border-slate-800 dark:border-red-600/20 hover:border-slate-900 dark:hover:border-red-600 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed text-sm uppercase tracking-widest"
                        >
                            {isLoading ? 'Processando...' : 'CONFIRMAR DEPÓSITO'}
                        </button>
                    </div>
                </div>

                {/* SIDEBAR DE SALDO */}
                <div className="space-y-6">
                    <div className="bg-nexus-white dark:bg-nexus-offBlack/30 p-6 rounded-2xl border border-slate-300 dark:border-white/5 shadow-xl shadow-lg dark:shadow-black/60 min-h-[340px] flex flex-col transition-colors">                        <h2 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Icon.Users className="w-4 h-4 text-slate-500" />
                        Saldos Atualizados
                    </h2>

                        {currentUser ? (
                            <div key={currentUser.id} className="space-y-4 animate-in fade-in slide-in-from-right-6 duration-700">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-300 dark:border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-red-500/20 flex items-center justify-center text-white dark:text-red-500 font-bold uppercase">
                                        {currentUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white text-sm font-bold">{currentUser.name}</p>
                                        <p className="text-slate-500 text-[12px] truncate w-40">{currentUser.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {(() => {
                                        const activeBalances = Object.entries(currentUser.balance).filter(([_, v]) => v > 0);

                                        if (activeBalances.length === 0) {
                                            return (
                                                <div className="text-center py-6 opacity-40 text-[10px] uppercase tracking-widest text-slate-500">
                                                    Nenhum ativo disponível
                                                </div>
                                            );
                                        }

                                        return activeBalances.map(([ticker, value]) => {
                                            const assetCfg = ASSET_CONFIG[ticker as AssetType];
                                            if (!assetCfg) return null;

                                            return (
                                                <div key={ticker} className={`p-3 rounded-xl border transition-all ${ticker === selectedAsset ? 'bg-white dark:bg-white/10 border-slate-400 dark:border-white/20' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5'}`}>
                                                    <div className="flex justify-between items-center text-xs">
                                                        <div className="flex items-center gap-2">
                                                            <assetCfg.icon className={`w-4 h-4 ${assetCfg.color}`} />
                                                            <span className="text-slate-500 dark:text-slate-400 uppercase font-bold">{ticker}</span>
                                                        </div>
                                                        <b className="text-slate-900 dark:text-white">
                                                            {ticker === 'BRL' && value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                            {ticker === 'USD' && value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                            {ticker !== 'BRL' && ticker !== 'USD' &&
                                                                parseFloat(Number(value).toFixed(assetCfg?.precision || 8))
                                                            }
                                                        </b>
                                                    </div>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 opacity-50">
                                <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                    <Icon.Users className="w-6 h-6" />
                                </div>
                                <p className="text-slate-500 text-xs px-4 font-medium">Selecione um usuário para visualizar os saldos.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* HISTÓRICO */}
            <div className="mt-10 bg-nexus-white dark:bg-nexus-offBlack/30 rounded-2xl border border-slate-300 dark:border-white/5 shadow-xl shadow-lg dark:shadow-black/60 overflow-hidden transition-colors">
                <div className="p-6 border-b border-slate-300 dark:border-white/5">
                    <h3 className="text-slate-900 dark:text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Icon.History className="w-4 h-4 text-slate-500" />
                        Histórico de Depósitos
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-300/50 dark:bg-white/5 text-slate-500 dark:text-slate-500 uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Usuário</th>
                                <th className="px-6 py-4">Ativo</th>
                                <th className="px-6 py-4">Valor</th>
                                <th className="px-6 py-4">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300 dark:divide-white/5">
                            {transactions.map(tx => (
                                <tr key={tx.id} className="text-slate-700 dark:text-slate-300 hover:bg-slate-300/30 dark:hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{tx.userName}</td>
                                    <td className="px-6 py-4 font-medium">{tx.asset}</td>
                                    <td className="px-6 py-4 text-emerald-600 dark:text-green-400 font-bold">+{tx.amount}</td>
                                    <td className="px-6 py-4 text-xs opacity-70 font-medium">{new Date(tx.date).toLocaleString('pt-BR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL DE CONFIRMAÇÃO E SUCESSO */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-nexus-offBlack border border-slate-200 dark:border-white/10 w-full max-w-md rounded-2xl p-8 shadow-2xl scale-in-center transition-colors">
                        {!showSuccess ? (
                            <>
                                <div className="flex items-center gap-3 mb-6 text-red-600 dark:text-red-500">
                                    <Icon.AlertTriangle className={`w-6 h-6 ${isLoading ? 'animate-pulse' : ''}`} />
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {isLoading ? 'Processando...' : 'Confirmar Depósito?'}
                                    </h3>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                                    Você está prestes a depositar <b className="text-slate-900 dark:text-white">{amount} {selectedAsset}</b> para
                                    <b className="text-slate-900 dark:text-white"> {users.find(u => u.id === selectedUserId)?.name}</b>.
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        disabled={isLoading}
                                        onClick={() => setIsConfirmModalOpen(false)}
                                        className="flex-1 px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all disabled:opacity-0"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        disabled={isLoading}
                                        onClick={executeTransaction}
                                        className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900 dark:bg-red-600 text-white font-bold hover:bg-slate-800 dark:hover:bg-red-500 transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : 'Confirmar'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="py-8 text-center">
                                <div className="relative w-24 h-24 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-green-500/10 dark:bg-green-500/20 border border-green-500/30 rounded-full animate-in zoom-in duration-500 shadow-[0_0_40px_rgba(34,197,94,0.1)] dark:shadow-[0_0_40px_rgba(34,197,94,0.2)]" />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon.Check
                                            className="w-12 h-12 text-green-600 dark:text-green-500 animate-in slide-in-from-bottom-4 fade-in duration-700"
                                            style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
                                        />
                                    </div>
                                </div>

                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-700" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Depósito Confirmado!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 px-6 font-medium">
                                        O valor de <span className="text-slate-900 dark:text-white font-bold">{amount} {selectedAsset}</span> foi creditado com sucesso.
                                    </p>

                                    <button
                                        onClick={() => setIsConfirmModalOpen(false)}
                                        className="w-full py-4 bg-green-500/80 dark:bg-green-500/70 border border-green-500/20 hover:bg-green-600 dark:hover:bg-green-500/20 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm shadow-lg shadow-green-500/20"
                                    >
                                        Concluído
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Deposit;