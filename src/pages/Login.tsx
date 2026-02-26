import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoNexus from '../assets/nexus-logo-white.png';
import BgLogin from '../assets/login-background.jpg';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.SyntheticEvent) => {
        e.preventDefault(); //Previne a pagina de recarregar

        if (email && password) {
            navigate('/home');
        } else {
            alert('Por favor, preencha email e senha');
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-nexus-dark px-4">

            <div
                className="absolute inset-0 z-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `url(${BgLogin})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Container do formulário de login */}
            <div className="max-w-md w-full bg-nexus-darkM/50  rounded-2xl shadow-xl p-8 border border-white/5 backdrop-blur-sm">
                {/* Cabeçalho */}
                <div className="text-center mb-1">
                    <img src={LogoNexus} alt="Logo Nexus" className="w-[200px] h-auto mx-auto mt-5 mb-5" />
                    <p className="text-slate-500 mb-10">Acesse sua conta</p>
                </div>


                {/* Formulário */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            className="w-full bg-nexus-dark text-white px-4 py-3 rounded-xl border border-slate-800 focus:ring-1 focus:ring-slate-600/90 focus:border-transparent outline-none transition-all"
                            placeholder="exemplo@nexus.com"
                            onChange={(e) => setEmail(e.target.value)} //Captura do texto
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            className="w-full bg-nexus-dark text-white px-4 py-3 rounded-xl border border-slate-800 focus:ring-1 focus:ring-slate-600/90 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)} //Captura da senha
                        />
                    </div>

                    <div className="pt-4 pb-2">
                        <button type="submit"
                            className="w-full py-4 bg-[#9d0404] text-white rounded-xl font-bold hover:bg-[#800303] active:scale-[0.98] transition-all shadow-lg shadow-red-900/10">
                            Entrar
                        </button>
                    </div>

                    <div className="text-center pb-2">
                        <p className="text-slate-400 text-sm">
                            Não possui uma conta?{" "}
                            <button
                                type="button" 
                                onClick={() => navigate('/register')}
                                className="text-white font-bold hover:text-red-600 transition-colors underline-offset-4 hover:underline"
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