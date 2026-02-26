import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Users: React.FC = () => {


    return (
        <div className="flex min-h-screen bg-nexus-dark">
            {/* Sidebar */}
            <Sidebar />
        </div>
    );
}

export default Users;