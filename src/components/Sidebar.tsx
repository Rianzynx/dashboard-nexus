import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoNexus from '../assets/nexus-logo-white.png';
import LogoNexusDark from '../assets/nexus-logo-black.png';
import * as Icon from '../components/Icons';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.classList.contains('dark');
    });

    const [isCollapsed, setIsCollapsed] = useState(() => {
        const saved = localStorage.getItem('@nexus:sidebar-collapsed');
        return saved ? JSON.parse(saved) : false;
    });

    const handleLogout = () => {
        navigate('/');
    };

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('@nexus:theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('@nexus:theme', 'light');
        }
    };

    useEffect(() => {
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
            {/* NAVBAR MOBILE */}
            <nav className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-nexus-dark backdrop-blur-xl border-b border-slate-200 dark:border-white/5 z-30 flex items-center justify-between px-6 transition-colors">
                <button onClick={() => setIsOpen(true)} className="p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-2xl">☰</span>
                </button>
                <img src={isDarkMode ? LogoNexus : LogoNexusDark} alt="Logo Nexus" className="w-[90px] h-auto" />
                <button className="p-2 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                    <Icon.User className="w-6 h-6" />
                </button>
            </nav>

            {/* OVERLAY MOBILE */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />
            )}

            {/* SIDEBAR CONTAINER */}
            <aside className={`fixed lg:relative top-0 left-0 z-50 h-screen
                            bg-slate-200 dark:bg-[#0a0a0b]/80 backdrop-blur-2xl
                            border-r border-slate-200 dark:border-white/5 
                            flex flex-col flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
                    ${!isOpen && (isCollapsed ? 'lg:w-[76px]' : 'lg:w-[260px]')}`}>

                {/* BOTÃO EXPANDIR/RECOLHER */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-4 top-72 w-6 h-6 rounded-full 
                                items-center justify-center text-slate-400 dark:text-white/70 bg-white dark:bg-[#0a0a0b]
                                border border-slate-200 dark:border-white/10 hover:scale-110 transition-all z-50 shadow-md group"
                >
                    <div className="transition-transform duration-300 flex items-center justify-center"
                        style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <Icon.CircleArrowRight className="w-7 h-7" />
                    </div>
                </button>

                {/* LOGO AREA */}
                <div className={`p-6 flex items-center h-20 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {isCollapsed ? (
                        <img src='favicon.png' alt="Logo" className="w-8 h-auto rounded-lg shadow-sm" />
                    ) : (
                        <img src={isDarkMode ? LogoNexus : LogoNexusDark} alt="Logo" className="w-[110px] h-auto animate-in fade-in duration-500" />
                    )}
                </div>

                {/* NAVEGAÇÃO */}
                <nav className={`mt-4 flex-1 overflow-y-auto space-y-1 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center transition-all rounded-xl  group relative ${isCollapsed ? 'justify-center h-12' : 'gap-4 px-4 h-12'} 
                                ${isActive ? 'bg-stone-700/40 dark:bg-red-600/10 text-white dark:text-white  dark:border-red-600/20 shadow-md dark:shadow-[0_0_20px_rgba(220,38,38,0.15)]'
                                    : 'text-slate-700 dark:text-white/55 hover:text-slate-900 dark:hover:text-slate-200 border-transparent hover:bg-black/10 dark:hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            {!isCollapsed && <span className="text-[13px] font-bold truncate">{item.name}</span>}


                        </NavLink>
                    ))}
                </nav>

                {/* BOTÃO DE LOGOUT */}
                <button
                    onClick={handleLogout}
                    className={`group flex items-center my-2 px-8 gap-3 w-full rounded-xl  border border-transparent hover:border-red-500/50  dark:hover:border-slate-500/20 dark:hover:bg-slate-500/10 transition-all
                        ${isCollapsed ? 'h-10 justify-center px-0' : 'h-11 px-4'}`}
                >
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-slate-500 dark:text-slate-400 transition-colors">
                        <Icon.LogOut className="w-5 h-5" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-[11px] font-bold uppercase  text-slate-700 dark:text-slate-400  transition-colors">
                            Sair da Conta
                        </span>
                    )}
                </button>

                {/* BOTÃO DE TEMA (MODO WHITE / MODO DARK) */}
                <div className="px-4 py-2 border-t border-slate-100 dark:border-white/5">
                    <button
                        onClick={toggleTheme}
                        className={`group flex items-center gap-3 w-full rounded-xl border border-slate-400 dark:border-white/10 bg-slate-300 dark:bg-white/[0.02] hover:bg-slate-500 dark:hover:bg-white/5 transition-all
                        ${isCollapsed ? 'h-10 justify-center px-0' : 'h-11 px-4'}`}
                    >
                        <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0">

                            <Icon.Moon className={`w-5 h-5 transition-all duration-500 absolute text-indigo-900 group-hover:text-indigo-600 
                                ${isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />


                            <Icon.Sun className={`w-5 h-5 transition-all duration-500 absolute text-amber-500 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]
                                ${isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
                        </div>
                        {!isCollapsed && (
                            <span className="text-[10px] hover:text-slate-900  uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-white dark:text-slate-400 dark:group-hover:text-white">
                                {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                            </span>
                        )}
                    </button>
                </div>

                {/* INFO RODAPÉ */}
                <div className="p-4 pt-0">
                    <div className={`rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-400 dark:border-white/5 transition-all duration-300 flex flex-col ${isCollapsed ? 'items-center p-1' : 'py-1 px-4'}`}>
                        {isCollapsed ? (
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        ) : (
                            <>
                                <p className="text-[9px] text-slate-400 dark:text-slate-600 uppercase tracking-widest font-black">Nexus v1.0</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Sistema Online</span>
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