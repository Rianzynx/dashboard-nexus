import React from 'react';
import * as Icon from '../components/Icons';
import { OptionSelect } from '../components/OptionSelect';
import { useConversion } from '../hooks/useConversion';
import { PriceChart } from '../components/PriceChart';

const Conversion: React.FC = () => {
    const {
        assets, fromAsset, toAsset,
        amount, setAmount, result, error,
        chartData,
        handleSwap, handleAssetChange
    } = useConversion();

    return (
        <div className="max-w-1xl mx-auto">
            <header className="mb-10">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Conversão de Ativos</h1>
                <p className="text-gray-500 text-sm">Cotações em tempo real via CoinGecko.</p>
            </header>

            <div className="bg-gray-200 dark:bg-nexus-offBlack/30 p-8 rounded-3xl border border-gray-300 dark:border-white/5 backdrop-blur-xl transition-colors shadow-sm dark:shadow-none">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    {/* ORIGEM */}
                    <div className="relative space-y-4">
                        <OptionSelect
                            label="De"
                            value={fromAsset}
                            onChange={(id) => handleAssetChange('from', id)}
                            options={assets.map(coin => ({
                                id: coin.symbol.toUpperCase(),
                                label: coin.name,
                                icon: coin.icon ? (

                                    <div className="w-5 h-5 flex items-center justify-center">
                                        {coin.icon}
                                    </div>
                                ) : (
                                    <img src={coin.image} className="w-5 h-5 rounded-full" alt="" />
                                )
                            }))}
                        />
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-white dark:bg-transparent text-2xl  text-gray-900 dark:text-white p-3 rounded-xl md:rounded-none md:bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-gray-500 dark:focus:border-white/30 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>

                    {/* ÍCONE DE TROCA */}
                    <div className="flex justify-center md:pb-10 px-4">
                        <button
                            onClick={handleSwap}
                            className="p-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-transparent rounded-full text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-95 shadow-sm dark:shadow-none"
                        >
                            <Icon.Repeat className="w-5 h-5" />
                        </button>
                    </div>

                    {/* DESTINO */}
                    <div className="relative space-y-4">
                        <OptionSelect
                            label="Para"
                            value={toAsset}
                            onChange={(id) => handleAssetChange('to', id)}
                            options={assets.map(coin => ({
                                id: coin.symbol.toUpperCase(),
                                label: coin.name,
                                icon: coin.icon ? (

                                    <div className="w-5 h-5 flex items-center justify-center">
                                        {coin.icon}
                                    </div>
                                ) : (
                                    <img src={coin.image} className="w-5 h-5 rounded-full" alt="" />
                                )
                            }))}
                        />
                        <div className="p-3 text-2xl text-gray-600 dark:text-gray-400 min-h-[40px] border-b border-transparent">
                            {result?.value != null
                                ? parseFloat(result.value.toFixed(8)).toLocaleString(undefined, { maximumFractionDigits: 8 })
                                : '---'}
                        </div>
                    </div>
                </div>

                {/* --- GRÁFICO INTEGRADO --- */}
                <div className="mt-8 min-h-[200px] flex flex-col">
                    {chartData && chartData.length > 0 ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-end mb-2 px-1">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                                    Tendência 7 Dias
                                </span>
                                <span className="text-[10px] text-gray-400">
                                    {fromAsset}/USD
                                </span>
                            </div>
                            <PriceChart
                                data={chartData}
                                isDark={document.documentElement.classList.contains('dark')}
                            />
                        </div>
                    ) : (
                        /* ESTADO VAZIO PARA MOEDAS FIAT OU CARREGAMENTO */
                        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-white/10 rounded-2xl bg-gray-50/50 dark:bg-white/5">
                            <Icon.TrendingUp className="w-8 h-8 text-gray-300 dark:text-white/10 mb-2" />
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Histórico indisponível para {fromAsset}
                            </p>
                        </div>
                    )}
                </div>
                {error && <p className="mt-4 text-red-500 font-bold text-xs text-center animate-shake">{error}</p>}

                <button
                    disabled={!result}
                    className="w-full h-[52px] flex items-center justify-center bg-gray-900 dark:bg-red-600/70 mt-8 hover:bg-gray-800 dark:hover:bg-red-600 border border-gray-800 dark:border-red-600/20 text-white font-bold rounded-xl transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed text-sm uppercase tracking-widest shadow-lg"
                >
                    Confirmar Conversão
                </button>

                {/* RESULTADO E TAXA */}
                {result && (
                    <div className="mt-6 p-4 bg-white dark:bg-nexus-offBlack border border-gray-300 dark:border-white/20 rounded-xl text-center animate-in fade-in zoom-in duration-300 shadow-sm">
                        <p className="text-[10px] text-gray-500 dark:text-white uppercase tracking-widest font-black mb-1">Taxa de Câmbio</p>
                        <p className="text-green-600 dark:text-green-500 font-bold text-sm">
                            1 {fromAsset} = {parseFloat(result.rate.toFixed(10))} {toAsset}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conversion;