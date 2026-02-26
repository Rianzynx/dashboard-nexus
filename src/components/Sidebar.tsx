import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import LogoNexus from '../assets/nexus-logo-white.png';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const menuItens = [
        { name: 'Home', path: '/home' },
        { name: 'Usuarios', path: '/users' },
        { name: 'Deposito', path: '/deposit' },
        { name: 'Saque', path: '/withdraw' },
        { name: 'Conversao', path: '/conversion' },
    ];

    return (
        <div className="w-64 bg-nexus-darkM/20 border-r border-slate-800 min-h-full">
            <div className="p-4">
                <img src={LogoNexus} alt="Logo Nexus" className="w-[150px] mt-4 h-auto mx-auto" />
            </div>
            <nav className="mt-6">
                {menuItens.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-6 py-3 text-base font-medium transition-all border-r-4 ${isActive ?
                                'bg-red-900/20 text-white border-red-700'
                                : 'text-slate-400 hover:text-white border-transparent'
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;