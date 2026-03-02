import * as Icon from '../components/Icons';
import { ASSET_CONFIG } from '../config/assets';
import { useTransactionForm } from '../hooks/useTransactionForm';
import { OptionSelect } from '../components/OptionSelect'
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
        <div>
            <header className="mb-10">
                <h1 className="text-2xl font-bold text-white">Depósito</h1>
                <p className="text-slate-500 text-sm">Administração de saldos e entradas manuais.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORMULÁRIO PRINCIPAL */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-nexus-offBlack/30 rounded-2xl p-6 border border-white/5 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* SELECT DE USUÁRIOS */}
                            <OptionSelect
                                label="Usuário Destino"
                                placeholder="Selecione um usuário..."
                                value={selectedUserId}
                                onChange={setSelectedUserId}
                                options={users.map(u => ({
                                    id: u.id,
                                    label: u.name,
                                    sublabel: u.email
                                }))}
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
                                <label className="block text-xs text-slate-400 uppercase font-bold mb-2">Valor do Depósito</label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-slate-500/50 transition-all"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Observação */}
                        <div>
                            <label className="block text-xs text-slate-400 uppercase font-bold mb-2">Observação (Opcional)</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-slate-500/50 transition-all resize-none"
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
                            className="w-full bg-red-600/40 hover:bg-red-600 border border-red-600/20 hover:border-red-600 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed text-sm uppercase tracking-widest"
                        >
                            {isLoading ? 'Processando...' : 'CONFIRMAR DEPÓSITO'}
                        </button>
                    </div>
                </div>

                {/* SIDEBAR DE SALDO */}
                <div className="space-y-6">
                    <div className="bg-nexus-offBlack/30 p-6 rounded-2xl border border-white/5 shadow-inner min-h-[340px] flex flex-col">
                        <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Icon.Users className="w-4 h-4 text-slate-500" />
                            Saldos Atualizados
                        </h2>

                        {currentUser ? (
                            <div key={currentUser.id} className="space-y-4 animate-in fade-in slide-in-from-right-6 duration-700">
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold uppercase">
                                        {currentUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">{currentUser.name}</p>
                                        <p className="text-slate-500 text-[12px] truncate w-40">{currentUser.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {Object.entries(currentUser.balance).map(([ticker, value]) => {
                                        const assetCfg = ASSET_CONFIG[ticker as AssetType];
                                        return (
                                            <div key={ticker} className={`p-3 rounded-xl border transition-all ${ticker === selectedAsset ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}>
                                                <div className="flex justify-between items-center text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <assetCfg.icon className={`w-4 h-4 ${assetCfg.color}`} />
                                                        <span className="text-slate-400 uppercase">{ticker}</span>
                                                    </div>
                                                    <b className="text-white">
                                                        {ticker === 'BRL' ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : value}
                                                    </b>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 opacity-50">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-600">
                                    <Icon.Users className="w-6 h-6" />
                                </div>
                                <p className="text-slate-500 text-xs px-4">Selecione um usuário para visualizar os saldos.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* HISTÓRICO */}
            <div className="mt-10 bg-nexus-offBlack/30 rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Icon.History className="w-4 h-4 text-slate-500" />
                        Histórico de Depósitos
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-slate-500 uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Usuário</th>
                                <th className="px-6 py-4">Ativo</th>
                                <th className="px-6 py-4">Valor</th>
                                <th className="px-6 py-4">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.map(tx => (
                                <tr key={tx.id} className="text-slate-300 hover:bg-white/[0.02]">
                                    <td className="px-6 py-4 font-medium text-white">{tx.userName}</td>
                                    <td className="px-6 py-4">{tx.asset}</td>
                                    <td className="px-6 py-4 text-green-400">+{tx.amount}</td>
                                    <td className="px-6 py-4 text-xs opacity-60">{new Date(tx.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL DE CONFIRMAÇÃO E SUCESSO */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-nexus-offBlack border border-white/10 w-full max-w-md rounded-2xl p-8 shadow-2xl scale-in-center">
                        {!showSuccess ? (
                            <>
                                <div className="flex items-center gap-3 mb-6 text-red-500">
                                    <Icon.AlertTriangle className={`w-6 h-6 ${isLoading ? 'animate-pulse' : ''}`} />
                                    <h3 className="text-xl font-bold text-white">
                                        {isLoading ? 'Processando...' : 'Confirmar Depósito?'}
                                    </h3>
                                </div>

                                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                    Você está prestes a depositar <b className="text-white">{amount} {selectedAsset}</b> para
                                    <b className="text-white"> {users.find(u => u.id === selectedUserId)?.name}</b>.
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        disabled={isLoading}
                                        onClick={() => setIsConfirmModalOpen(false)}
                                        className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 text-slate-400 font-semibold hover:bg-white/10 transition-all disabled:opacity-0"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        disabled={isLoading}
                                        onClick={executeTransaction}
                                        className="flex-1 px-4 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-all shadow-lg flex items-center justify-center gap-2"
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
                                    <div className="absolute inset-0 bg-green-500/20 border border-green-500/30 rounded-full animate-in zoom-in duration-500 shadow-[0_0_40px_rgba(34,197,94,0.2)]" />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon.Check
                                            className="w-12 h-12 text-green-500 animate-in slide-in-from-bottom-4 fade-in duration-700 fill-none stroke-"
                                            style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
                                        />
                                    </div>
                                </div>

                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-700" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
                                    <h3 className="text-2xl font-bold text-white mb-2">Depósito Confirmado!</h3>
                                    <p className="text-slate-400 text-sm mb-8 px-6">
                                        O valor de <span className="text-white ">{amount} {selectedAsset}</span> foi creditado com sucesso.
                                    </p>

                                    <button
                                        onClick={() => setIsConfirmModalOpen(false)}
                                        className="w-full py-4 bg-green-500/70 border border-green-500/20 hover:bg-green-500/20 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm"
                                    >
                                        Concluído
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Deposit;