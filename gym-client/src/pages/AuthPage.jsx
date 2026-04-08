import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-black/30 overflow-hidden">
                {/* Form Area */}
                <div className="p-6 md:p-10">
                    <div className="mb-10 text-center">
                        <div className="h-10 w-10 bg-emerald-400/90 rounded-lg rotate-45 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                             <div className="h-4 w-4 bg-black rounded-xs -rotate-45"></div>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white uppercase italic">IronCore Portal</h1>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mt-2">Professional Grade Fitness</p>
                    </div>

                    {showLogin ? <Login /> : <Register />}

                    {/* Switcher Area */}
                    <div className="mt-10 pt-8 border-t border-white/10 text-center">
                        <p className="text-gray-300 text-xs font-medium">
                            {showLogin ? "Awaiting activation?" : "Already verified?"}
                            <button
                                onClick={() => setShowLogin(!showLogin)}
                                className="ml-2 font-semibold text-emerald-400 hover:text-emerald-300 transition-all duration-300 uppercase tracking-widest text-[10px] underline underline-offset-4 decoration-emerald-400/60"
                            >
                                {showLogin ? 'Initialize Account' : 'Authenticate'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default AuthPage;
