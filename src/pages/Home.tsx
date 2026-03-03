import React, { useState } from "react";

import AnimatedList, { AnimatedItem } from "../components/AnimatedList";

import { ASSET_CONFIG } from '../config/assets';
import type { AssetType } from "../types";
import { useTransactionContext } from "../contexts/TransactionContext";
import { useIndicators } from "../hooks/useIndicators"
import { useAssetBalances } from "../hooks/useAssetBalances";


const Home: React.FC = () => {
    const { allTransactions } = useTransactionContext();
    const [showAll, setShowAll] = useState(false);
    const { indicators } = useIndicators();
    const { assetBalances } = useAssetBalances();
    const [showAllAssets, setShowAllAssets] = React.useState(false);

    return (
        <>
            <header className="mb-10">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Dashboard</h1>
                <p className="text-slate-500 text-sm">Bem-vindo ao Nexus, Usuario.</p>
            </header>

            {/* INDICADORES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Trocamos mockIndicators por indicators (que vem do hook) */}
                {indicators.map((item) => (
                    <div key={item.id} className="relative bg-slate-200 dark:bg-nexus-offBlack/30 backdrop-blur-md 
                py-4 px-4 rounded-2xl border border-slate-300 dark:border-white/10 
                hover:bg-slate-200 dark:hover:bg-white/[0.07] hover:border-slate-400 dark:hover:border-white/20 
                transition-all duration-500 flex items-center gap-4 group">

                        {item.icon && (

                            <div className={`p-2.5 rounded-xl flex-shrink-0 relative ${item.color}`}>
                                <div className="relative z-10 scale-90 md:scale-100">
                                    {item.icon}
                                </div>
                            </div>
                        )}

                        <div className="relative z-10 min-w-0">
                            <p className="text-slate-500 text-[9px] md:text-[10px] uppercase font-bold tracking-wider mb-0.5 truncate">
                                {item.label}
                            </p>
                            <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white tracking-tight truncate transition-colors">
                                {item.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                {/* MOVIMENTAÇÕES */}
                <section className="lg:col-span-2 bg-slate-200 dark:bg-nexus-offBlack/30 rounded-2xl p-6 border border-slate-200 dark:border-white/5 transition-colors">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg text-slate-900 dark:text-white font-bold transition-colors">Últimas Movimentações</h2>

                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-xs text-[#2badca] hover:brightness-125 transition-all font-semibold uppercase tracking-wider">
                            {showAll ? 'Ver Menos' : 'Ver Todas'}
                        </button>
                    </div>

                    <AnimatedList className="space-y-3">
                        {allTransactions.length > 0 ? (
                            allTransactions.slice(0, showAll ? undefined : 5).map((transaction, index) => {
                                const config = ASSET_CONFIG[transaction.asset as AssetType];
                                const IconComponent = config.icon;

                                return (
                                    <AnimatedItem key={transaction.id} index={index}>
                                        <div className="flex justify-between items-center p-4 bg-black/5 dark:bg-white/[0.03] rounded-xl  dark:border-black/5 hover:bg-slate-300 dark:hover:bg-white/[0.06] transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 rounded-lg dark:bg-transparent shadow-sm dark:shadow-none">
                                                    <IconComponent className={`w-4 h-4 ${config.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 dark:text-white font-medium text-sm transition-colors">{transaction.userName}</p>
                                                    <p className="text-slate-500 text-[10px] uppercase tracking-wider">
                                                        {new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} • {transaction.type}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold text-sm ${transaction.type === 'DEPOSIT' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-500'}`}>
                                                    {transaction.type === 'DEPOSIT' ? '+' : '-'} {transaction.amount}
                                                </p>
                                                <p className="text-[10px] text-slate-500 font-bold">{transaction.asset}</p>
                                            </div>
                                        </div>
                                    </AnimatedItem>
                                );
                            })) : (
                            <div className="text-center py-10 text-slate-500 text-sm italic">
                                Nenhuma movimentação registrada.
                            </div>
                        )}
                    </AnimatedList>
                </section>

                {/* ATIVOS */}
                <section className="bg-slate-200 dark:bg-nexus-offBlack/30 rounded-2xl p-6 border border-slate-200 dark:border-white/5 transition-colors">
                    <h2 className="text-lg text-slate-900 dark:text-white font-bold mb-6 transition-colors">Saldo dos ativos</h2>

                    <div className="space-y-4">
                        {assetBalances.slice(0, showAllAssets ? undefined : 5).map((asset) => {
                            const config = ASSET_CONFIG[asset.ticker as AssetType];
                            const AssetIcon = config.icon;

                            return (
                                <div key={asset.ticker} className="flex justify-between items-center p-3 rounded-xl bg-slate-200/40 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/[0.06] transition-all group animate-in fade-in slide-in-from-top-1">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${config.bgColor} border ${config.borderColor} shadow-sm dark:shadow-none`}>
                                            <AssetIcon className={`w-5 h-5 ${config.color}`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">{asset.ticker}</span>
                                            <span className="text-[10px] text-slate-500 uppercase">{config.name}</span>
                                        </div>
                                    </div>

                                    {/* LADO DIREITO: VALORES */}
                                    <div className="flex flex-col items-end">
                                        <span className="text-slate-700 dark:text-slate-200 font-mono text-sm font-bold transition-colors">
                                            {asset.value}
                                        </span>

                                        {/* Mostra a conversão apenas se não for BRL e se houver saldo */}
                                        {asset.ticker !== 'BRL' && asset.rawTotal > 0 && (
                                            <span className="text-[10px] text-slate-500 font-medium animate-in fade-in duration-500">
                                                ≈ {asset.convertedBRL}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* BOTÃO VER MAIS (Mantenha o botão que criamos antes aqui) */}
                    {assetBalances.length > 5 && (
                        <button
                            onClick={() => setShowAllAssets(!showAllAssets)}
                            className="w-full mt-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            {showAllAssets ? "Ver Menos" : `Ver Todos (${assetBalances.length})`}
                        </button>
                    )}
                </section>
            </div>
        </>
    );
};

export default Home;