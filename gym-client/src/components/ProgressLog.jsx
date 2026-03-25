import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';

const ProgressLog = () => {

    const queryClient = useQueryClient();
    const [exercise, setExercise] = useState({
        name: '',
        sets: '',
        reps: '',
        weight: ''
    })

    const [selectedPlan, setSelectedPlan] = useState('');

    //fetch plans: get available plans (to link the workout)
    const { data: plans } = useQuery({
        queryKey: ['plans'],
        queryFn: async () => {
            const res = await API.get('/plans');
            //we now have the error 
            //dont have to if(!response.ok?), axios automatically generates an error.message/no throw new needed
            //res.data is the res.json(), so we use res.data.data to get the actual data

            return res.data.data;
        }
    });

    //fetch workout history
    const { data: history } = useQuery({
        queryKey: ['workouts'],
        queryFn: async () => {
            const res = await API.get('/workouts/me');
            return res.data.data;
        }
    })

    //create the logMutation // mutation is the action that saves to the db
    const logMutation = useMutation({
        mutationFn: async (payload) => {
            const res = await API.post('/workouts', payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success('success! workout logged!');
            //now tell tanstack, history data is old, fetch the new one
            queryClient.invalidateQueries(['workouts']);
            //reset the form
            setExercise({ name: '', sets: '', reps: '', weight: '' });
        },
        onError: (error) => {
            const msg = error.response?.data?.message || 'failed to log workout';
            toast.error(msg);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedPlan) return toast.error('choose a plan first!');
        if (!exercise.name) return toast.error('that exercise did you do?');

        logMutation.mutate({
            plan: selectedPlan,
            exercises: [exercise]
        })
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen pb-20 bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
            <h1 className="text-4xl font-bold mb-2 text-white tracking-tight uppercase italic">Track Progress 📈</h1>
            <p className="text-gray-300 mb-8 font-medium">Log your daily sets and watch your gains grow.</p>
            {/* LOG FORM */}
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg shadow-black/30 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

                <h3 className="text-gray-400 font-semibold mb-6 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Quick Log Entry
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <select
                        className="bg-white/5 backdrop-blur-md text-gray-200 p-4 rounded-xl outline-none border border-white/10 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 font-semibold appearance-none cursor-pointer"
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                    >
                        <option value="">Select your Plan...</option>
                        {plans?.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                    <input
                        className="bg-white/5 backdrop-blur-md text-gray-200 p-4 rounded-xl outline-none border border-white/10 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 font-medium placeholder:text-gray-500"
                        placeholder="Exercise (e.g. Bench Press)"
                        value={exercise.name}
                        onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-2">Sets</label>
                        <input type="number" className="bg-white/5 backdrop-blur-md text-gray-200 p-4 rounded-xl border border-white/10 w-full focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 outline-none transition-all duration-300" value={exercise.sets} onChange={(e) => setExercise({ ...exercise, sets: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-2">Reps</label>
                        <input type="number" className="bg-white/5 backdrop-blur-md text-gray-200 p-4 rounded-xl border border-white/10 w-full focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 outline-none transition-all duration-300" value={exercise.reps} onChange={(e) => setExercise({ ...exercise, reps: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-2">Weight (KG)</label>
                        <input type="number" className="bg-white/5 backdrop-blur-md text-gray-200 p-4 rounded-xl border border-white/10 w-full focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 outline-none transition-all duration-300" value={exercise.weight} onChange={(e) => setExercise({ ...exercise, weight: e.target.value })} />
                    </div>
                </div>
                <button
                    disabled={logMutation.isPending}
                    className="w-full bg-emerald-500/90 hover:bg-emerald-400 text-black font-bold py-5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:scale-105 disabled:opacity-50 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                    {logMutation.isPending ? 'SAVING TO CLOUD...' : 'LOG WORKOUT 💪'}
                </button>
            </form>
            {/* RECENT HISTORY */}
            <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-semibold text-white tracking-tight italic">Activity Feed</h2>
                <div className="h-px flex-1 bg-white/10 mx-6 opacity-70"></div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {history?.length === 0 && <p className="text-gray-400 text-center py-10 font-medium italic">No workouts logged yet. Time to hit the gym! 🏋️‍♂️</p>}

                {history?.map(w => (
                    <div key={w._id} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20">
                        <div className="flex items-center gap-6">
                            <div className="h-14 w-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-emerald-400/20 group-hover:scale-105 transition-transform duration-300">🏋️‍♂️</div>
                            <div>
                                <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.25em] mb-1 opacity-90">{w.plan?.name || 'Self-Guided'}</p>
                                <h3 className="text-xl font-semibold text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors duration-300">{w.exercises[0]?.name}</h3>
                                <div className="mt-2 flex gap-4 text-xs text-gray-300 font-semibold uppercase tracking-wider">
                                    <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{w.exercises[0]?.sets} Sets</span>
                                    <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{w.exercises[0]?.reps} Reps</span>
                                    <span className="text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/20">{w.exercises[0]?.weight}KG</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-semibold text-gray-400 bg-white/5 px-3 py-1 rounded-lg uppercase tracking-tighter border border-white/10">
                                {new Date(w.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


    //end of progresslog component
}

export default ProgressLog;