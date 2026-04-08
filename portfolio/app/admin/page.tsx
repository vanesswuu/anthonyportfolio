"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import './admin.css';

export default function AdminDashboard() {
    const [session, setSession] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('tab-coaching');
    const [loading, setLoading] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    // Data state
    const [data, setData] = useState<{
        coaching: any[],
        ecosystem: any[],
        developers: any[],
        credentials: any[],
        awards: any[]
    }>({
        coaching: [],
        ecosystem: [],
        developers: [],
        credentials: [],
        awards: []
    });
    const [editingItem, setEditingItem] = useState<any>(null);
    const [notification, setNotification] = useState<{ 
        show: boolean, 
        type: 'success' | 'error' | 'confirm', 
        title: string, 
        message: string, 
        onConfirm?: () => void 
    }>({
        show: false,
        type: 'success',
        title: '',
        message: '',
    });

    const showNotify = (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void) => {
        setNotification({ show: true, type, title, message, onConfirm });
    };

    const closeNotify = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    const fetchData = async () => {
        const [coaching, ecosystem, developers, credentials, awards] = await Promise.all([
            supabase.from('coaching').select('*'),
            supabase.from('companies').select('*'),
            supabase.from('developers').select('*'),
            supabase.from('credentials').select('*'),
            supabase.from('awards').select('*').order('year', { ascending: false })
        ]);

        setData({
            coaching: coaching.data || [],
            ecosystem: ecosystem.data || [],
            developers: developers.data || [],
            credentials: credentials.data || [],
            awards: awards.data || []
        });
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;

                if (!session) {
                    router.push('/login');
                } else {
                    setSession(session);
                }
            } catch (err) {
                router.push('/login');
            } finally {
                setAuthChecked(true);
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                setSession(session);
            }
            if (event === 'SIGNED_OUT') {
                setSession(null);
                router.push('/login');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    useEffect(() => {
        if (session) {
            fetchData();
        }
    }, [session, activeTab]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const uploadImage = async (file: File, folder: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage.from('portfolio_images').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('portfolio_images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleDelete = async (table: string, id: string) => {
        showNotify('confirm', 'Are you sure?', 'This action cannot be undone.', async () => {
            setLoading(true);
            try {
                const { error } = await supabase.from(table).delete().eq('id', id);
                if (error) throw error;
                showNotify('success', 'Deleted', 'Item has been removed.');
                await fetchData();
            } catch (err: any) {
                showNotify('error', 'Delete Failed', err.message);
            }
            setLoading(false);
        });
    };

    const startEdit = (item: any) => {
        setEditingItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingItem(null);
    };

    const handleCoaching = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        try {
            let publicUrl = editingItem?.image_url || '';
            const fileInput = form.querySelector('#c-image') as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) {
                publicUrl = await uploadImage(file, 'coaching');
            }

            const payload = {
                image_url: publicUrl,
                badge_text: (form.querySelector('#c-badge') as HTMLInputElement).value,
                title: (form.querySelector('#c-title') as HTMLInputElement).value,
                description: (form.querySelector('#c-desc') as HTMLTextAreaElement).value
            };

            if (editingItem) {
                const { error } = await supabase.from('coaching').update(payload).eq('id', editingItem.id);
                if (error) throw error;
                showNotify('success', 'Updated', 'Coaching card updated successfully.');
            } else {
                const { error } = await supabase.from('coaching').insert([{
                    ...payload
                }]);
                if (error) throw error;
                showNotify('success', 'Published', 'New coaching card has been added.');
            }

            form.reset();
            setEditingItem(null);
            await fetchData();
        } catch (err: any) {
            showNotify('error', 'Error', err.message);
        }
        setLoading(false);
    };

    const handleEcosystem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        try {
            let publicUrl = editingItem?.logo_url || '';
            const fileInput = form.querySelector('#e-image') as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) publicUrl = await uploadImage(file, 'companies');

            const payload = {
                logo_url: publicUrl,
                name: (form.querySelector('#e-name') as HTMLInputElement).value,
                website_url: (form.querySelector('#e-url') as HTMLInputElement).value,
                description: (form.querySelector('#e-desc') as HTMLTextAreaElement).value
            };

            if (editingItem) {
                const { error } = await supabase.from('companies').update(payload).eq('id', editingItem.id);
                if (error) throw error;
                showNotify('success', 'Updated', 'Company details updated.');
            } else {
                const { error } = await supabase.from('companies').insert([payload]);
                if (error) throw error;
                showNotify('success', 'Published', 'New company added to ecosystem.');
            }
            form.reset();
            setEditingItem(null);
            await fetchData();
        } catch (err: any) { showNotify('error', 'Error', err.message); }
        setLoading(false);
    };

    const handleDevelopers = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        try {
            let publicUrl = editingItem?.logo_url || '';
            const fileInput = form.querySelector('#d-image') as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) publicUrl = await uploadImage(file, 'developers');

            const payload = {
                logo_url: publicUrl,
                name: (form.querySelector('#d-name') as HTMLInputElement).value,
                website_url: (form.querySelector('#d-url') as HTMLInputElement).value
            };

            if (editingItem) {
                const { error } = await supabase.from('developers').update(payload).eq('id', editingItem.id);
                if (error) throw error;
                showNotify('success', 'Updated', 'Partner details updated.');
            } else {
                const { error } = await supabase.from('developers').insert([payload]);
                if (error) throw error;
                showNotify('success', 'Published', 'New partner company added.');
            }
            form.reset();
            setEditingItem(null);
            await fetchData();
        } catch (err: any) { showNotify('error', 'Error', err.message); }
        setLoading(false);
    };

    const handleCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        try {
            const payload = {
                institution: (form.querySelector('#cred-institution') as HTMLInputElement).value,
                title: (form.querySelector('#cred-title') as HTMLInputElement).value,
                organization: (form.querySelector('#cred-org') as HTMLInputElement).value,
                category: (form.querySelector('#cred-category') as HTMLSelectElement).value
            };

            if (editingItem) {
                const { error } = await supabase.from('credentials').update(payload).eq('id', editingItem.id);
                if (error) throw error;
                showNotify('success', 'Updated', 'Credential updated.');
            } else {
                const { error } = await supabase.from('credentials').insert([payload]);
                if (error) throw error;
                showNotify('success', 'Published', 'New educational credential added.');
            }
            form.reset();
            setEditingItem(null);
            await fetchData();
        } catch (err: any) { showNotify('error', 'Error', err.message); }
        setLoading(false);
    };

    const handleAwards = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        try {
            const payload = {
                title: (form.querySelector('#award-title') as HTMLInputElement).value,
                organization: (form.querySelector('#award-org') as HTMLInputElement).value,
                year: (form.querySelector('#award-year') as HTMLInputElement).value
            };

            if (editingItem) {
                const { error } = await supabase.from('awards').update(payload).eq('id', editingItem.id);
                if (error) throw error;
                showNotify('success', 'Updated', 'Award updated.');
            } else {
                const { error } = await supabase.from('awards').insert([payload]);
                if (error) throw error;
                showNotify('success', 'Published', 'New award recognition added.');
            }
            form.reset();
            setEditingItem(null);
            await fetchData();
        } catch (err: any) { showNotify('error', 'Error', err.message); }
        setLoading(false);
    };

    if (!session) return null;

    return (
        <div className="admin-container">
            <div className="dash-header">
                <div>
                    <span className="overline">Control Panel</span>
                    <h2 style={{ margin: 0 }}>Dashboard</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ color: 'var(--gray)', fontSize: '14px' }}>{session.user.email}</span>
                    <button onClick={handleLogout} className="text-link" style={{ background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}>Disconnect →</button>
                </div>
            </div>

            <div className="tabs">
                <button className={`tab-btn ${activeTab === 'tab-coaching' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-coaching'); setEditingItem(null); }}>
                    <span className="tab-icon">🎯</span>
                    Coaching Grid
                </button>
                <button className={`tab-btn ${activeTab === 'tab-ecosystem' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-ecosystem'); setEditingItem(null); }}>
                    <span className="tab-icon">🏢</span>
                    My Companies
                </button>
                <button className={`tab-btn ${activeTab === 'tab-developers' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-developers'); setEditingItem(null); }}>
                    <span className="tab-icon">🤝</span>
                    Partners
                </button>
                <button className={`tab-btn ${activeTab === 'tab-credentials' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-credentials'); setEditingItem(null); }}>
                    <span className="tab-icon">🎓</span>
                    Education
                </button>
                <button className={`tab-btn ${activeTab === 'tab-awards' ? 'active' : ''}`} onClick={() => { setActiveTab('tab-awards'); setEditingItem(null); }}>
                    <span className="tab-icon">🏆</span>
                    Awards
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'tab-coaching' && (
                    <>
                        <h3>{editingItem ? 'Edit' : 'Add'} Coaching Card</h3>
                        <p style={{ color: 'var(--gray)', fontSize: '13px', marginBottom: '24px' }}>Update the selected card or add a new one.</p>
                        <form onSubmit={handleCoaching} className="admin-form">
                            <div className="form-row">
                                <input type="file" id="c-image" accept="image/*" required={!editingItem} />
                                <input type="text" id="c-badge" placeholder="Badge Text (e.g. Pillar 01)" defaultValue={editingItem?.badge_text || ''} required />
                            </div>
                            <div className="form-row">
                                <input type="text" id="c-title" placeholder="Title" defaultValue={editingItem?.title || ''} required />
                            </div>
                            <textarea id="c-desc" placeholder="Card Description" defaultValue={editingItem?.description || ''} required></textarea>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="submit" className="big-btn" disabled={loading} style={{ flex: 1 }}>
                                    {loading ? 'Processing...' : (editingItem ? 'Update Coaching Card' : 'Publish Coaching Card')}
                                </button>
                                {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{ background: 'var(--bg2)', flex: 0.3 }}>Cancel</button>}
                            </div>
                        </form>

                        <div className="manage-section">
                            <h4>Manage Coaching Grid</h4>
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Logo</th>
                                            <th>Badge</th>
                                            <th>Title</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.coaching.map((item: any) => (
                                            <tr key={item.id}>
                                                <td><img src={item.image_url} alt="" /></td>
                                                <td>{item.badge_text}</td>
                                                <td>{item.title}</td>
                                                <td className="actions-cell">
                                                    <div className="actions-wrapper">
                                                        <button className="action-btn edit" onClick={() => startEdit(item)}>Edit</button>
                                                        <button className="action-btn delete" onClick={() => handleDelete('coaching', item.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'tab-ecosystem' && (
                    <>
                        <h3>{editingItem ? 'Edit' : 'Add'} My Company</h3>
                        <p style={{ color: 'var(--gray)', fontSize: '13px', marginBottom: '24px' }}>Appears in the horizontal snapping scroll section.</p>
                        <form onSubmit={handleEcosystem} className="admin-form">
                            <div className="form-row">
                                <input type="file" id="e-image" accept="image/*" required={!editingItem} />
                                <input type="text" id="e-name" placeholder="Company Name" defaultValue={editingItem?.name || ''} required />
                            </div>
                            <div className="form-row">
                                <input type="url" id="e-url" placeholder="Website URL" defaultValue={editingItem?.website_url || ''} required />
                            </div>
                            <textarea id="e-desc" placeholder="Company Description" defaultValue={editingItem?.description || ''} required></textarea>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="submit" className="big-btn" disabled={loading} style={{ flex: 1 }}>
                                    {loading ? 'Processing...' : (editingItem ? 'Update Company' : 'Publish Company')}
                                </button>
                                {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{ background: 'var(--bg2)', flex: 0.3 }}>Cancel</button>}
                            </div>
                        </form>

                        <div className="manage-section">
                            <h4>Manage My Companies</h4>
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Logo</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.ecosystem.map((item: any) => (
                                            <tr key={item.id}>
                                                <td><img src={item.logo_url} alt="" /></td>
                                                <td>{item.name}</td>
                                                <td className="actions-cell">
                                                    <div className="actions-wrapper">
                                                        <button className="action-btn edit" onClick={() => startEdit(item)}>Edit</button>
                                                        <button className="action-btn delete" onClick={() => handleDelete('companies', item.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'tab-developers' && (
                    <>
                        <h3>{editingItem ? 'Edit' : 'Add'} Partner Company</h3>
                        <p style={{ color: 'var(--gray)', fontSize: '13px', marginBottom: '24px' }}>Appears in the grid and marquee tracking strip.</p>
                        <form onSubmit={handleDevelopers} className="admin-form">
                            <div className="form-row">
                                <input type="file" id="d-image" accept="image/*" required={!editingItem} />
                                <input type="text" id="d-name" placeholder="Developer Name" defaultValue={editingItem?.name || ''} required />
                            </div>
                            <div className="form-row">
                                <input type="url" id="d-url" placeholder="Website URL" defaultValue={editingItem?.website_url || ''} required />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="submit" className="big-btn" disabled={loading} style={{ flex: 1 }}>
                                    {loading ? 'Processing...' : (editingItem ? 'Update Partner' : 'Publish Partner')}
                                </button>
                                {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{ background: 'var(--bg2)', flex: 0.3 }}>Cancel</button>}
                            </div>
                        </form>

                        <div className="manage-section">
                            <h4>Manage Partner Companies</h4>
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Logo</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.developers.map((item: any) => (
                                            <tr key={item.id}>
                                                <td><img src={item.logo_url} alt="" /></td>
                                                <td>{item.name}</td>
                                                <td className="actions-cell">
                                                    <div className="actions-wrapper">
                                                        <button className="action-btn edit" onClick={() => startEdit(item)}>Edit</button>
                                                        <button className="action-btn delete" onClick={() => handleDelete('developers', item.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'tab-credentials' && (
                    <>
                        <h3>{editingItem ? 'Edit' : 'Add'} Education Credential</h3>
                        <p style={{ color: 'var(--gray)', fontSize: '13px', marginBottom: '24px' }}>Appears in the Executive Credentials section.</p>
                        <form onSubmit={handleCredentials} className="admin-form">
                            <div className="form-row">
                                <input type="text" id="cred-institution" placeholder="Institution" defaultValue={editingItem?.institution || ''} required />
                                <select id="cred-category" defaultValue={editingItem?.category || ''} required>
                                    <option value="">Select Category</option>
                                    <option value="harvard">Harvard</option>
                                    <option value="other">Other Institutions</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <input type="text" id="cred-title" placeholder="Credential Title" defaultValue={editingItem?.title || ''} required />
                                <input type="text" id="cred-org" placeholder="Organization & Year" defaultValue={editingItem?.organization || ''} required />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="submit" className="big-btn" disabled={loading} style={{ flex: 1 }}>
                                    {loading ? 'Processing...' : (editingItem ? 'Update Credential' : 'Publish Credential')}
                                </button>
                                {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{ background: 'var(--bg2)', flex: 0.3 }}>Cancel</button>}
                            </div>
                        </form>

                        <div className="manage-section">
                            <h4>Manage Education</h4>
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Institution</th>
                                            <th>Title</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.credentials.map((item: any) => (
                                            <tr key={item.id}>
                                                <td>{item.institution}</td>
                                                <td>{item.title}</td>
                                                <td className="actions-cell">
                                                    <div className="actions-wrapper">
                                                        <button className="action-btn edit" onClick={() => startEdit(item)}>Edit</button>
                                                        <button className="action-btn delete" onClick={() => handleDelete('credentials', item.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'tab-awards' && (
                    <>
                        <h3>{editingItem ? 'Edit' : 'Add'} Award / Recognition</h3>
                        <p style={{ color: 'var(--gray)', fontSize: '13px', marginBottom: '24px' }}>Appears in the Awards & Recognition wall.</p>
                        <form onSubmit={handleAwards} className="admin-form">
                            <div className="form-row">
                                <input type="text" id="award-title" placeholder="Award Title" defaultValue={editingItem?.title || ''} required />
                                <input type="text" id="award-year" placeholder="Year" defaultValue={editingItem?.year || ''} required />
                            </div>
                            <div className="form-row">
                                <input type="text" id="award-org" placeholder="Awarding Organization" defaultValue={editingItem?.organization || ''} required />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="submit" className="big-btn" disabled={loading} style={{ flex: 1 }}>
                                    {loading ? 'Processing...' : (editingItem ? 'Update Award' : 'Publish Award')}
                                </button>
                                {editingItem && <button type="button" onClick={cancelEdit} className="big-btn" style={{ background: 'var(--bg2)', flex: 0.3 }}>Cancel</button>}
                            </div>
                        </form>

                        <div className="manage-section">
                            <h4>Manage Awards</h4>
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Title</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.awards.map((item: any) => (
                                            <tr key={item.id}>
                                                <td>{item.year}</td>
                                                <td>{item.title}</td>
                                                <td className="actions-cell">
                                                    <div className="actions-wrapper">
                                                        <button className="action-btn edit" onClick={() => startEdit(item)}>Edit</button>
                                                        <button className="action-btn delete" onClick={() => handleDelete('awards', item.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {notification.show && (
                <div className="modal-overlay" onClick={closeNotify}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <span className="modal-icon">
                            {notification.type === 'success' ? '✅' : notification.type === 'confirm' ? '⚠️' : '❌'}
                        </span>
                        <h3 className="modal-title">{notification.title}</h3>
                        <p className="modal-message">{notification.message}</p>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            {notification.type === 'confirm' ? (
                                <>
                                    <button onClick={closeNotify} className="big-btn" style={{ background: 'var(--bg)', flex: 1 }}>Cancel</button>
                                    <button onClick={() => { notification.onConfirm?.(); closeNotify(); }} className="big-btn" style={{ background: '#e74c3c', border: 'none', color: 'white', flex: 1 }}>Delete</button>
                                </>
                            ) : (
                                <button onClick={closeNotify} className="big-btn" style={{ flex: 1 }}>Dismiss</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
