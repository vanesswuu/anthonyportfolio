
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';



const ProgressPhotos = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const queryClient = useQueryClient;

    //fetch user progress photos  //useQuery is for fetching
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await API.get('/auth/me');
            return data.data;
        }

    });

    //progress photo uploader //useMutation for creating/deleting
    const addPhoto = useMutation({
        mutationFn: async (formData) => {
            const { data } = await API.post('/upload/progress', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return data;
        },
        onSuccess: () => {
            toast.success('photo uploaded');
            setSelectedFile(null);
            setPreview(null);
            queryClient.invalidateQueries(['user']); //refresh the photos
        }
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('image', selectedFile);
        addPhoto.mutate(formData);
    }

    return (

        <div className="space-y-8 mt-12 bg-black/20 p-8 rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-xl font-black text-white uppercase tracking-widest">Transformation Gallery 📸</h2>
            {/* --- UPLOADER UI --- */}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <label className="flex-1 w-full h-16 bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-all">
                    <span className="text-gray-400 text-sm">
                        {selectedFile ? selectedFile.name : 'Choose a photo...'}
                    </span>
                    <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                </label>
                {preview && <img src={preview} alt="preview" className="w-16 h-16 rounded-lg object-cover border-2 border-emerald-500 shadow-lg" />}
                <button
                    disabled={addPhoto.isPending || !selectedFile}
                    className="w-full md:w-auto bg-emerald-500 text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-400 disabled:opacity-20 transition-all"
                >
                    {addPhoto.isPending ? 'Sending...' : 'Save Photo'}
                </button>
            </form>
            {/* --- THE GALLERY --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {user?.progressPhotos?.map((url, index) => (
                    <div key={index} className="aspect-square relative group overflow-hidden rounded-2xl border border-white/5 shadow-xl">
                        <img
                            src={url}
                            alt="Progress"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center text-[8px] text-white font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Entry #{index + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );



    //end of progress photos    
}

export default ProgressPhotos;