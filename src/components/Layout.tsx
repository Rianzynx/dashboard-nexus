import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#050614] overflow-hidden">
            {/* Sidebar fixa/relativa */}
            <Sidebar />

            {/*  Main padronizado para todas as páginas */}
            <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">

                <div className="p-4 md:p-8 pt-24 lg:pt-10 max-w-[1600px] mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;