import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { token, user } = useAuth();

    if (token && !user) return <p>checking permissions...</p>

    if (!token || user?.role !== 'admin') {
        return <Navigate to='/dashboard' replace />
    }
    
    return <Outlet />;

}

export default AdminRoute;