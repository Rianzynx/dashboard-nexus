import React, { useState } from "react";
import Layout from "../components/Layout";
import { mockIndicators } from "../mocks/indicators";
import { mockAssets } from "../mocks/assets";
import { mockTransactions } from "../mocks/transactions";

import AnimatedList, { AnimatedItem } from "../components/AnimatedList";


const Home: React.FC = () => {

    const [showAll, setShowAll] = useState(false);

    return (
        <Layout>
            <header className="mb-10">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-500 text-sm">Bem-vindo ao Nexus, Usuario.</p>
            </header>

            {/* INDICADORES*/}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockIndicators.map((item: any) => (
                    <div key={item.id} className="bg-[#0b0c21]/50 p-6 rounded-2xl border border-white/5 hover:bg-[#0b0c21]/80 transition-all flex items-center gap-4">

                        {/* Container do Ícone */}
                        {item.icon && (
                            <div className={`p-3 rounded-xl flex-shrink-0 ${item.color}`}>
                                {item.icon}
                            </div>
                        )}

                        <div>
                            <p className="text-slate-500 text-xs">{item.label}</p>
                            <h3 className="text-xl font-bold text-white">{item.value}</h3>
                        </div>

                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                {/* MOVIMENTAÇÕES*/}
                <section className="lg:col-span-2 bg-[#0b0c21]/30 rounded-2xl p-6 border border-white/5 ">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg text-white font-bold">Últimas Movimentações</h2>

                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-xs text-[#2badca] hover:text-[#104c5a] transition-colors font-semibold uppercase tracking-wider">

                            {showAll ? 'Ver Menos' : 'Ver Todas'}
                        </button>
                    </div>

                    <AnimatedList className="space-y-4">
                        {mockTransactions.slice(0, showAll ? undefined : 5).map((transaction, index) => (
                            <AnimatedItem key={transaction.id} index={index}>
                                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                    <div>
                                        <p className="text-white font-medium">{transaction.userName}</p>
                                        <p className="text-slate-400 text-xs">
                                            {new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${transaction.type === 'DEPOSIT' ? 'text-green-500' : 'text-red-500'}`}>
                                            {transaction.type === 'DEPOSIT' ? '+' : '-'} {transaction.amount} {transaction.asset}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedItem>
                        ))}
                    </AnimatedList>
                </section>

                {/* ATIVOS*/}
                <section className="bg-[#0b0c21]/30 rounded-2xl p-6 border border-white/5">
                    <h2 className="text-lg text-white font-bold mb-6">Saldo dos ativos</h2>
                    <div className="space-y-4">
                        {mockAssets.map((asset) => (
                            <div key={asset.ticker} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="font-bold text-white">{asset.ticker}</span>
                                <span className="text-slate-300 font-mono">{asset.value}</span>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

        </Layout>
    );
};

export default Home;