import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../../api/axios';

const ProgressStats = () => {

    //fetch prs
    const { data: prs, isLoading } = useQuery({
        queryKey: ['prs'],
        queryFn: async () => {
            const res = await API.get('/stats/prs');
            return res.data.data;
        }
    })

    if (isLoading) return <div className="p-10 text-white italic">Loading Stats...</div>;
    return (
        <div className="p-6 bg-black min-h-screen text-white">
            <h1 className="text-3xl font-bold italic mb-8 uppercase tracking-tight">Your Performance 📈</h1>
            {/* PR CARDS: Simple boxes to show your "Top Scores" */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {prs?.map(pr => (
                    <div key={pr._id} className="bg-zinc-900 p-6 rounded-2xl border border-white/5 shadow-lg shadow-black/20">
                        <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Personal Best</p>
                        <h3 className="text-xl font-bold uppercase italic">{pr._id}</h3>
                        <p className="text-3xl font-black mt-2">{pr.maxWeight} <span className="text-xs text-gray-500 font-normal opacity-50 uppercase tracking-widest ml-1">KG</span></p>
                    </div>
                ))}
            </div>
            {/* THE CHART BOX: Using Recharts to draw your progress */}
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
                <h2 className="text-lg font-bold mb-6 italic uppercase opacity-70">Growth Trajectory</h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={prs}>
                            {/* Grid, Rulers, and Pop-ups */}
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="_id" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px', fontSize: '10px' }}
                                itemStyle={{ color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase' }}
                            />
                            {/* The Pen that draws the line */}
                            <Line
                                type="monotone"
                                dataKey="maxWeight"
                                stroke="#10b981"
                                strokeWidth={4}
                                dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#000' }}
                                activeDot={{ r: 8, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

};

export default ProgressStats;