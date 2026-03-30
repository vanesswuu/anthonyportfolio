import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout'
import AuthPage from './pages/AuthPage'
import Plans from './components/Plans'
import Dashboard from './components/Dashboard'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './components/AdminDashboard'
import ProgressLog from './components/ProgressLog';
import ProgressStats from './components/ProgressStats';

function App() {

  const { token } = useAuth();

  //protected routes needs token to be accessed
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/" replace />
    }
    return children;
  }

  return (
    <div className='App bg-black text-gray-300 min-h-screen'>
      <Toaster position='top-right' reverseOrder={false} />

      <Routes>

        <Route path='/' element={<AuthPage />} />

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/progress' element={<ProgressLog />} />
          <Route path='/stats' element={<ProgressStats />} />


          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>


        </Route>



      </Routes>

    </div>
  );
}


export default App;