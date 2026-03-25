import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            const result = await response.json();

            if (result.success) {
                setData(result.data);
            } else {
                toast.error(result.message || 'Failed to fetch the data');
            }

        } catch (err) {
            console.error('fetch error: ', err);
            toast.error('server error. please try again');
        } finally {
            setLoading(false);
        }
        //end of fetchData
    };



    useEffect(() => {

        if (token) {
            fetchData();
        }

        //end of useEffect 
    }, [url, token]);

    return { data, loading, refetch: fetchData };

    //end of useFetch component
}


export default useFetch;