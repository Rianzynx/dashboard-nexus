import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoNexus from '../assets/nexus-logo-white.png';
import * as Icon from '../components/Icons';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const saved = localStorage.getItem('@nexus:sidebar-collapsed');
        return saved ? JSON.parse(saved) : false;
    });

    React.useEffect(() => {
        localStorage.setItem('@nexus:sidebar-collapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    const menuItems = [
        { name: 'Início', path: '/home', icon: <Icon.Home className="w-6 h-6" /> },
        { name: 'Usuários', path: '/users', icon: <Icon.Users className="w-6 h-6" /> },
        { name: 'Depósito', path: '/deposit', icon: <Icon.Deposit className="w-6 h-6" /> },
        { name: 'Saque', path: '/withdraw', icon: <Icon.Withdraw className="w-6 h-6" /> },
        { name: 'Conversão', path: '/conversion', icon: <Icon.Conversion className="w-6 h-6" /> },
    ];

    return (
        <>
            {/* --- NAVBAR FIXA TOPO (Mobile)*/}
            <nav className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-nexus-dark backdrop-blur-xl border-b border-white/5 z-30 flex items-center justify-between px-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <span className="text-2xl">☰</span>
                </button>

                <div className="flex items-center gap-3">
                    <img src={LogoNexus} alt="Logo Nexus" className="w-[90px] h-auto" />
                </div>

                <button className="p-2 text-white hover:bg-white/5 rounded-lg transition-colors">
                    <Icon.User className="w-6 h-6" />
                </button>
            </nav>

            {/* OVERLAY (Mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* SIDEBAR CONTAINER */}
            <aside className={`fixed lg:relative top-0 left-0 z-50 h-screen
                            bg-[#0a0a0b]/80 backdrop-blur-2xl
                            border-r border-white/5 shadow-[4px_0_24px_rgba(0,0,0,0.3)]
                            
                            flex flex-col flex-shrink-0
                            
                            transition-[width,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                            will-change-[width]
                            
                    ${isOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
                    ${!isOpen && (isCollapsed ? 'lg:w-[76px]' : 'lg:w-[260px]')}`}>

                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />


                {/* BOTÃO DE EXPANDIR/RECOLHER  */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-4 top-72 w-6 h-6 rounded-full 
                                items-center justify-center text-white/70
                                hover:scale-110 transition-all z-50 shadow-xl 
                                cursor-pointer group"
                >
                    <div
                        className="transition-transform duration-300 flex items-center justify-center"
                        style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        <Icon.CircleArrowRight className="w-7 h-7" />
                    </div>
                </button>

                {/* Header da Sidebar */}
                <div className={`p-6 flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="relative flex items-center justify-center">
                        {isCollapsed ? (
                            <img src='favicon.png' alt="Logo Nexus" className="w-10 h-auto rounded-xl" />
                        ) : (
                            <img src={LogoNexus} alt="Logo Nexus" className="w-[120px] h-auto animate-in fade-in duration-500" />
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-slate-500 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* LINKS DE NAVEGAÇÃO */}
                <nav className={`mt-8 flex-1 overflow-y-auto space-y-2 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            title={isCollapsed ? item.name : ''}
                            className={({ isActive }) =>
                                `flex items-center transition-all rounded-xl border group relative ${isCollapsed ? 'justify-center px-0 py-4' : 'gap-4 px-4 py-3'
                                } ${isActive ?
                                    'bg-red-600/10 text-white border-red-600/20 shadow-[0_0_20px_rgba(220,38,38,0.15)]'
                                    : 'text-white/55 hover:text-slate-200 border-transparent hover:bg-white/5'
                                }`
                            }
                        >
                            <span className={`flex-shrink-0 transition-colors ${item.name === 'Início' ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                {item.icon}
                            </span>

                            <span className={`text-[13px] font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                                {item.name}
                            </span>

                            {isCollapsed && (
                                <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full opacity-0 group-[.active]:opacity-100 transition-opacity" />
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* INFO RODAPE */}
                <div className="p-4 mt-auto">
                    <div className={`rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300 flex flex-col ${isCollapsed ? 'items-center p-2' : 'p-4'}`}>
                        {isCollapsed ? (
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        ) : (
                            <>
                                <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black">Nexus v1.0</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] text-slate-400 font-medium">Sistema Online</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;