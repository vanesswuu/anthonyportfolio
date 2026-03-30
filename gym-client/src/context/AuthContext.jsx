import { createContext, useState, useContext, useEffect } from 'react';



//the umbrella
const AuthContext = createContext();

//the provider(the component that holds the umbrella)
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    //fetch user to get role
    const fetchUser = async (token) => {

        try {

            const res = await fetch('http://localhost:5001/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await res.json();
            if (data.success) {
                setUser(data.data);
            }

        } catch (err) {
            console.error('authcontext fetch error:', err)
        }


    }

    useEffect(() => {
        if (token) {
            fetchUser(token);
        } else {
            setUser(null);
        }
    }, [token]);


    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };



    return (
        //pass the props globally
        <AuthContext.Provider value={{ token, setToken, logout, user }}>
            {children}
        </AuthContext.Provider>

    )

};

//custom hook so components can easily ask for the data
export const useAuth = () => {
    return useContext(AuthContext);
}





