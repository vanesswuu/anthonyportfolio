import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

const Plans = () => {
    const { token } = useAuth();

    const { data: plans, isLoading, error } = useQuery({
        queryKey: ['plans'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5001/api/plans');
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            return result.data;
        }
    });

    const handleSubscribe = async (planId) => {
        if (!token) {
            toast.error('Please log in to subscribe');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/subscriptions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId: planId })
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Successfully subscribed!');
            } else {
                toast.error('You have an existing subscription');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <div className="text-center py-20 text-gray-400 font-medium">Crunching the numbers...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;

    return (
        <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase italic">
                        Select your <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Power</span>
                    </h2>
                    <p className="mt-4 text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs">Choose the perfect plan for your fitness journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div key={plan._id} className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center group hover:bg-white/15 transition-all duration-300 shadow-lg shadow-black/30">
                            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-[0.3em] mb-4">{plan.name}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-5xl font-bold text-white tabular-nums">${plan.price}</span>
                                <span className="text-gray-400 text-[10px] font-semibold uppercase ml-1 tracking-widest italic">/mo</span>
                            </div>
                            <p className="text-gray-300 text-center mb-10 h-10 leading-relaxed font-medium italic opacity-90 group-hover:opacity-100 transition-opacity">"{plan.description}"</p>

                            <button
                                onClick={() => handleSubscribe(plan._id)}
                                className="w-full bg-emerald-500/90 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 mt-auto border border-emerald-300/30"
                            >
                                Secure Access
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Plans;
