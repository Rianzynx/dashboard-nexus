import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-200/40 dark:bg-nexus-darkM overflow-hidden transition-colors duration-500">
            <Sidebar />

            <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
                <div className="p-4 md:p-8 pt-24 lg:pt-10 max-w-[1600px] mx-auto w-full text-slate-900 dark:text-white">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;