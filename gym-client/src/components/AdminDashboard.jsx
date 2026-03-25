import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const AdminDashboard = () => {
    const [file, setFile] = useState(null);
    const { user, logout, token } = useAuth();
    const queryClient = useQueryClient();

    const { data: plans, isLoading } = useQuery({
        queryKey: ['plans'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5001/api/plans');
            const result = await res.json();
            return result.data;
        }
    })

    const createMutation = useMutation({
        mutationFn: async (planData) => {
            const res = await fetch('http://localhost:5001/api/plans', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(planData)
            });
            return res.json();
        },
        onSuccess: () => {
            toast.success('New plan created!');
            formik.resetForm();
            queryClient.invalidateQueries(['plans']);
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (planId) => {
            const res = await fetch(`http://localhost:5001/api/plans/${planId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return res.json();
        },
        onSuccess: () => {
            toast.success('Plan deleted');
            queryClient.invalidateQueries(['plans']);
        }
    })

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'Too short!').required('Required'),
        description: Yup.string().min(10, 'Too short!').required('Required'),
        price: Yup.number().positive('Must be positive').required('Required')
    });

    const formik = useFormik({
        initialValues: { name: '', description: '', price: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let imageUrl = '';
                if (file) {
                    const formData = new FormData();
                    formData.append('image', file);
                    const res = await fetch('http://localhost:5001/api/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    const uploadData = await res.json();
                    imageUrl = uploadData.url;
                }
                createMutation.mutate({ ...values, image: imageUrl });
                setFile(null);
            } catch (error) {
                toast.error('failed to upload image');
            }
        }
    });

    if (isLoading) return <div className="text-center py-20 text-gray-400 font-medium italic">Loading Admin Tools...</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 selection:bg-emerald-500/30 text-gray-100 bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-2xl border border-white/10 shadow-lg shadow-black/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                    <div>
                        <h1 className="text-4xl font-bold text-white uppercase tracking-tight italic mb-1">Command Center</h1>
                        <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.4em]">IronCore Administrative Interface</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
                    {/* Create Form Section */}
                    <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 h-fit sticky top-24 shadow-lg shadow-black/30">
                        <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                            New Provision
                        </h3>
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="group">
                                <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 tracking-widest group-focus-within:text-emerald-400 transition-colors">Manifest Name</label>
                                <input placeholder='Plan Identity' {...formik.getFieldProps('name')}
                                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-3 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 text-sm text-gray-200" />
                                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-[10px] mt-2 font-black uppercase tracking-tighter ml-1">{formik.errors.name}</p>}
                            </div>
                            
                            <div className="group">
                                <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 tracking-widest group-focus-within:text-emerald-400 transition-colors">Description</label>
                                <textarea placeholder='Operational Details' {...formik.getFieldProps('description')}
                                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-3 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 h-28 text-sm text-gray-200 resize-none" />
                                {formik.touched.description && formik.errors.description && <p className="text-red-500 text-[10px] mt-2 font-black uppercase tracking-tighter ml-1">{formik.errors.description}</p>}
                            </div>

                            <div className="group">
                                <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 tracking-widest group-focus-within:text-emerald-400 transition-colors">Valuation</label>
                                <input type='number' placeholder='USD Amount' {...formik.getFieldProps('price')}
                                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-3 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 text-sm text-gray-200" />
                                {formik.touched.price && formik.errors.price && <p className="text-red-500 text-[10px] mt-2 font-black uppercase tracking-tighter ml-1">{formik.errors.price}</p>}
                            </div>

                            <div className="group">
                                <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 tracking-widest group-focus-within:text-emerald-400 transition-colors">Visual Asset</label>
                                <input type='file' onChange={(e) => setFile(e.target.files[0])} 
                                    className="w-full bg-white/5 backdrop-blur-md border border-dashed border-white/10 p-3 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 text-[10px] cursor-pointer file:bg-white/10 file:border file:border-white/10 file:text-gray-200 file:text-[10px] file:font-semibold file:uppercase file:px-3 file:py-1 file:rounded file:mr-3 hover:bg-white/10" />
                            </div>

                            <button type='submit' disabled={createMutation.isPending}
                                className="w-full bg-emerald-500/90 text-black font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 border border-emerald-300/30 hover:bg-emerald-400 mt-6">
                                {createMutation.isPending ? 'Processing...' : 'Deploy Inventory'}
                            </button>
                        </form>
                    </div>

                    {/* Management Section */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-xl font-semibold text-white italic uppercase tracking-tight">Current Inventory</h2>
                            <div className="h-px flex-1 bg-white/10 ml-4"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {plans && plans.map((plan) => (
                                <div key={plan._id} className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col group hover:bg-white/15 transition-all duration-300 shadow-lg shadow-black/20 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-0 group-hover:opacity-[0.02] transform rotate-45 translate-x-8 -translate-y-8 transition-opacity"></div>
                                    
                                    <div className="relative mb-6">
                                        <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover rounded-xl shadow-lg shadow-black/30 brightness-90 group-hover:brightness-100 transition-all duration-300 grayscale group-hover:grayscale-0 border border-white/10" />
                                        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                                            <p className="text-[10px] font-semibold text-white tabular-nums">${plan.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-1">{plan._id.substring(18)}</h4>
                                            <h3 className="text-xl font-semibold text-gray-100 uppercase tracking-tight group-hover:text-white transition-colors duration-300">{plan.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => { if (window.confirm('Erase this manifest entry?')) deleteMutation.mutate(plan._id) }}
                                            disabled={deleteMutation.isPending}
                                            className="text-gray-400 hover:text-red-400 transition-all duration-300 p-2 text-[10px] font-semibold uppercase tracking-widest border border-white/10 rounded-lg hover:border-red-400/30 hover:bg-red-500/10"
                                        >
                                            Erase
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

