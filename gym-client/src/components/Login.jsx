import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const user = await response.json();
            if (user.success) {
                localStorage.setItem('token', user.token);
                setToken(user.token);
                navigate('/dashboard');
                toast.success('Welcome back!');
            } else {
                toast.error(user.message || 'Invalid Credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="group">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 group-focus-within:text-emerald-400 transition-colors tracking-[0.2em]">Credential</label>
                        <input
                            type='email' name='email' placeholder='Email ID'
                            onChange={handleChange}
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 mt-1 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300 text-sm text-gray-200 placeholder:text-gray-500"
                            required
                        />
                    </div>
                    
                    <div className="group">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase ml-1 group-focus-within:text-emerald-400 transition-colors tracking-[0.2em]">Security Key</label>
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
                    Authorize Session
                </button>
            </form>
        </div>
    );

};

export default Login;
