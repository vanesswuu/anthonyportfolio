import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Register = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success('Successfully registered!');
                navigate('/dashboard');
            } else {
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.log('Registration error: ', error);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="group">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 group-focus-within:text-emerald-400 transition-colors tracking-[0.2em]">Identity Name</label>
                        <input
                            type='text' name='name' placeholder='Full Name'
                            onChange={handleChange}
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 text-sm text-gray-200 placeholder:text-gray-500"
                            required
                        />
                    </div>

                    <div className="group">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 group-focus-within:text-emerald-400 transition-colors tracking-[0.2em]">Contact Email</label>
                        <input
                            type='email' name='email' placeholder='Email Address'
                            onChange={handleChange}
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 text-sm text-gray-200 placeholder:text-gray-500"
                            required
                        />
                    </div>

                    <div className="group">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 group-focus-within:text-emerald-400 transition-colors tracking-[0.2em]">New Password</label>
                        <input
                            type='password' name='password' placeholder='••••••••'
                            onChange={handleChange}
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 text-sm text-gray-200 placeholder:text-gray-500"
                            required
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className="w-full bg-emerald-500/90 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-[0.98] mt-4"
                >
                    Initialize Account
                </button>
            </form>
        </div>
    );

};

export default Register;
