import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Withdraw: React.FC = () => {


    return (
        <div className="flex h-screen bg-nexus-dark overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-white/5">
                <Sidebar />
            </aside>

            {/* Sidebar Mobile  */}
            <div className="lg:hidden">
                <Sidebar />
            </div>

        </div>
    );
}

export default Withdraw;