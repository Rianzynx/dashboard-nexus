import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import LogoNexusWhite from '../assets/nexus-logo-white.png';
import LogoNexusBlack from '../assets/nexus-logo-black.png';
import BgLoginWhite from '../assets/login-background-white.jpg';
import BgLoginBlack from '../assets/login-background-black.jpg';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDark, setIsDark] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const handleLogin = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (email && password) {
            navigate('/home');
        } else {
            alert('Por favor, preencha email e senha');
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-nexus-dark px-4 transition-colors duration-300">

            {/* Botão de Alternar Tema ( */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all z-50 border border-slate-200 dark:border-white/10 shadow-sm"
            >
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <div
                className="absolute inset-0 z-0 opacity-30 dark:opacity-5 pointer-events-none transition-all duration-700"
                style={{
                    backgroundImage: `url(${isDark ? BgLoginWhite : BgLoginBlack})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Container do formulário com suporte a Dark Mode */}
            <div className="max-w-md w-full bg-slate-50/80 dark:bg-nexus-darkM/50 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-white/5 backdrop-blur-sm z-10 transition-colors">

                {/* Cabeçalho */}
                <div className="text-center mb-1">
                    <img
                        src={isDark ? LogoNexusWhite : LogoNexusBlack}
                        alt="Logo Nexus"
                        className="w-[200px] h-auto mx-auto mt-5 mb-5 transition-all duration-300"
                    />
                    <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">
                        Acesse sua conta
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            className="w-full bg-white dark:bg-nexus-dark text-slate-900 dark:text-white px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-red-600/20 dark:focus:ring-slate-600/90 focus:border-red-600 dark:focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                            placeholder="exemplo@nexus.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            className="w-full bg-white dark:bg-nexus-dark text-slate-900 dark:text-white px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-red-600/20 dark:focus:ring-slate-600/90 focus:border-red-600 dark:focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="pt-4 pb-2">
                        <button type="submit"
                            className="w-full py-4 bg-[#9d0404] text-white rounded-xl font-bold hover:bg-[#800303] active:scale-[0.98] transition-all shadow-lg shadow-red-900/20">
                            Entrar
                        </button>
                    </div>

                    <div className="text-center pb-2">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Não possui uma conta?{" "}
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="text-slate-900 dark:text-white font-bold hover:text-red-600 dark:hover:text-red-600 transition-colors underline-offset-4 hover:underline"
                            >
                                Registre-se!
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;