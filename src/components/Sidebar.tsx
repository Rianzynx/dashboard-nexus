import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoNexus from '../assets/nexus-logo-white.png';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Início', path: '/home', icon: '🏠' },
        { name: 'Usuários', path: '/users', icon: '👥' },
        { name: 'Depósito', path: '/deposit', icon: '💰' },
        { name: 'Saque', path: '/withdraw', icon: '📤' },
        { name: 'Conversão', path: '/conversion', icon: '🔄' },
    ];

    return (
        <>
            {/* BOTÃO MOBILE (Hambúrguer) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center bg-slate-900/80 border border-white/10 rounded-lg text-white shadow-lg backdrop-blur-md transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
            >
                ☰
            </button>

            {/* OVERLAY */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* SIDEBAR CONTAINER */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64 bg-[#0b0c21] border-r border-white/5 
                transition-transform duration-300 ease-in-out
                flex flex-col h-full
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>

                <div className="p-6">
                    <img src={LogoNexus} alt="Logo Nexus" className="w-[130px] h-auto mx-auto lg:mt-4" />
                </div>

                <nav className="mt-8">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all border-r-4 ${isActive ?
                                    'bg-red-900/10 text-white border-red-600 shadow-[inset_-4px_0_15px_rgba(220,38,38,0.1)]'
                                    : 'text-slate-500 hover:text-slate-200 border-transparent hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="text-lg opacity-70">{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* INFO RODAPÉ */}
                <div className="absolute bottom-8 left-6 right-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Nexus Admin v1.0</p>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;