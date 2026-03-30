import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';
import ProgressPhotos from './ProgressPhotos';


const Dashboard = () => {
    const { data: user, loading: userLoading } = useFetch('http://localhost:5001/api/auth/me');
    const { data: plan, loading: planLoading } = useFetch('http://localhost:5001/api/subscriptions/me');
    const { logout } = useAuth();

    if (userLoading) return <div className="text-center py-20 text-gray-400 font-medium italic">Loading your profile...</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
            <div className="max-w-xl mx-auto">
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/30">
                    {/* Header Area */}
                    <div className="bg-black/20 backdrop-blur-md p-6 md:p-10 text-center relative border-b border-white/10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"></div>
                        <div className="w-20 h-20 bg-white/10 border border-white/10 rounded-xl mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-black/20">
                            {user?.name?.charAt(0)}
                        </div>
                        <h1 className="text-3xl font-bold text-white uppercase tracking-tight mb-1 select-none italic">{user?.name}</h1>
                        <p className="text-emerald-400 font-semibold text-[10px] uppercase tracking-[0.3em] opacity-90">{user?.email}</p>
                    </div>

                    {/* Info Body */}
                    <div className="p-6 md:p-10 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest pl-1">Membership Status</h2>
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all duration-300">
                                <div>
                                    <p className="text-xl font-semibold text-gray-100 uppercase tracking-tight italic">
                                        {plan ? (plan?.plan?.name) : ("NO ACTIVE PLAN")}
                                    </p>
                                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mt-1">
                                        {plan ? "Validated Member" : "Awaiting Enrollment"}
                                    </p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${plan ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] animate-pulse' : 'bg-gray-600'}`}></div>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold py-4 rounded-xl border border-white/10 transition-all duration-300 uppercase tracking-widest text-[10px] hover:scale-105"
                        >
                            Terminate Session
                        </button>
                    </div>
                </div>
                <ProgressPhotos />

            </div>
        </div>
    );

};

export default Dashboard;
