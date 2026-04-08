import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout, user } = useAuth();

    return (
        <nav className="bg-black/50 backdrop-blur-xl text-white shadow-lg shadow-black/30 sticky top-0 z-50 px-4 md:px-6 py-4 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-300">

                {/* Logo Area */}
                <h2 className="text-2xl font-bold italic tracking-tight">
                    IRON<span className="text-emerald-400">GYM</span>
                </h2>

                {/* Navigation Links */}
                <div className="flex items-center gap-4 md:gap-6 text-sm font-semibold uppercase tracking-widest">
                    {user?.role === 'admin' ? (
                        <Link to='/admin' className="text-gray-300 hover:text-emerald-400 transition-all duration-300">
                            Admin Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to='/dashboard' className="text-gray-300 hover:text-emerald-400 transition-all duration-300">
                                Dashboard
                            </Link>
                            <Link to='/plans' className="text-gray-300 hover:text-emerald-400 transition-all duration-300">
                                Plans
                            </Link>
                            <Link to='/progress' className="text-gray-300 hover:text-emerald-400 transition-all duration-300">
                                Track Progress
                            </Link>
                            <Link to='/stats' className="text-gray-300 hover:text-emerald-400 transition-all duration-300">
                                Stats
                            </Link>
                        </>
                    )}

                    {/* The "Invisible" Logout Button - Fixed with Tailwind! */}
                    <button
                        onClick={logout}
                        className="bg-emerald-500/80 hover:bg-emerald-400 text-black px-5 py-2 rounded-xl border border-emerald-300/30 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all duration-300"
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
