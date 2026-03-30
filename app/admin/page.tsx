'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Mail, User, Calendar, MessageSquare, BadgeCheck, 
  Plus, LogOut, LayoutDashboard, Briefcase, Bell, Trash2, MapPin
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'programs' | 'events' | 'quotations'>('inquiries');
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // New Item States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProgram, setNewProgram] = useState({ title: '', price: '', description: '', features: '', is_popular: false });
  const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', description: '' });

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
    } else {
      setUser(user);
    }
  }

  async function fetchData() {
    setLoading(true);
    const [inq, prog, evt] = await Promise.all([
      supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('coaching_programs').select('*').order('created_at', { ascending: false }),
      supabase.from('events').select('*').order('created_at', { ascending: false })
    ]);

    if (inq.data) setInquiries(inq.data);
    if (prog.data) setPrograms(prog.data);
    if (evt.data) setEvents(evt.data);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.signOut();
    router.push('/login');
  }

  async function addProgram() {
    const featuresArray = newProgram.features.split(',').map(f => f.trim());
    const { error } = await supabase.from('coaching_programs').insert([{ 
      ...newProgram, 
      features: featuresArray 
    }]);
    if (!error) {
      setShowAddModal(false);
      fetchData();
    }
  }

  async function addEvent() {
    const { error } = await supabase.from('events').insert([newEvent]);
    if (!error) {
      setShowAddModal(false);
      fetchData();
    }
  }

  async function deleteItem(table: string, id: string) {
    if (confirm('Are you sure you want to delete this?')) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (!error) fetchData();
    }
  }

  const quotations = inquiries.filter(i => i.program?.toLowerCase().includes('quotation') || i.message?.toLowerCase().includes('quote'));

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-50 flex font-body text-neutral-900">
      {/* Sleek Sidebar */}
      <aside className="w-64 bg-neutral-950 flex flex-col fixed h-full z-20 border-r border-white/5">
        <div className="p-8 mb-4">
          <div className="text-lg font-black uppercase tracking-tighter text-white">
            TON <span className="text-accent italic font-accent lowercase font-normal">Leuterio</span>
          </div>
          <div className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-500 mt-1">Control Console</div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
            { id: 'quotations', label: 'Quotations', icon: LayoutDashboard },
            { id: 'programs', label: 'Programs', icon: Briefcase },
            { id: 'events', label: 'Events', icon: Bell },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-bold text-xs uppercase tracking-widest ${activeTab === item.id ? 'bg-white/10 text-white border border-white/10' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'}`}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-10 max-w-7xl">
        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
           {[
             { label: 'Leads', val: inquiries.length, color: 'text-neutral-900' },
             { label: 'Pending Quotes', val: quotations.length, color: 'text-accent' },
             { label: 'Active Programs', val: programs.length, color: 'text-neutral-900' },
             { label: 'Events', val: events.length, color: 'text-neutral-900' },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">{stat.label}</div>
                <div className={`text-3xl font-black ${stat.color}`}>{stat.val}</div>
             </div>
           ))}
        </div>

        <header className="flex justify-between items-end mb-8 border-b border-neutral-200 pb-6">
          <div>
            <h2 className="text-2xl font-heading font-black uppercase tracking-tighter text-neutral-900">
              {activeTab} <span className="text-accent italic font-accent lowercase font-normal">management</span>
            </h2>
          </div>
          {['programs', 'events'].includes(activeTab) && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-lg font-black uppercase tracking-widest text-[9px] hover:bg-accent transition-all shadow-md"
            >
              <Plus size={14} /> New {activeTab.slice(0, -1)}
            </button>
          )}
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            {(activeTab === 'inquiries' || activeTab === 'quotations') && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-400 text-[9px] font-black uppercase tracking-[0.15em]">
                      <th className="px-6 py-4">Inquirer Details</th>
                      <th className="px-6 py-4">Context</th>
                      <th className="px-6 py-4">Message Segment</th>
                      <th className="px-6 py-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {(activeTab === 'inquiries' ? inquiries : quotations).map(inq => (
                      <tr key={inq.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-neutral-900 text-sm">{inq.full_name}</div>
                          <div className="text-xs text-neutral-400 font-medium">{inq.email}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/5 px-2 py-1 rounded">
                            {inq.program}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-neutral-500 text-xs line-clamp-1 max-w-xs">{inq.message}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-neutral-400 text-[10px] font-bold tabular-nums">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y divide-neutral-100 border-collapse">
                {programs.map(prog => (
                  <div key={prog.id} className="p-8 hover:bg-neutral-50 transition-all relative group">
                    <button 
                      onClick={() => deleteItem('coaching_programs', prog.id)} 
                      className="absolute top-6 right-6 text-neutral-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-1 text-neutral-900">{prog.title}</h3>
                    <div className="text-accent font-black text-xs mb-4">{prog.price}</div>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-medium">{prog.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.features?.map((f: string, i: number) => (
                        <span key={i} className="text-[8px] font-black uppercase tracking-wider bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="divide-y divide-neutral-100">
                {events.map(evt => (
                  <div key={evt.id} className="flex justify-between items-center p-6 hover:bg-neutral-50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-neutral-900 rounded-lg flex flex-col items-center justify-center text-white shrink-0 group-hover:bg-accent transition-colors">
                        <span className="text-lg font-black leading-none">{new Date(evt.date).getDate()}</span>
                        <span className="text-[7px] font-black uppercase tracking-tighter opacity-60">
                          {new Date(evt.date).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-black uppercase tracking-widest text-sm text-neutral-900">{evt.title}</h3>
                        <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em] mt-1">
                          <span className="flex items-center gap-1.5"><MapPin size={10} /> {evt.location}</span>
                          <span className="opacity-20">|</span>
                          <span>{evt.date}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteItem('events', evt.id)} 
                      className="text-neutral-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sleek Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative border border-neutral-200">
            <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50">
              <h2 className="text-lg font-heading font-black uppercase tracking-tighter">Add <span className="text-accent">{activeTab.slice(0, -1)}</span></h2>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-neutral-900 transition-colors text-[10px] font-black uppercase tracking-widest">Close</button>
            </div>
            
            <div className="p-8 space-y-5">
              {activeTab === 'programs' ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Title</label>
                    <input type="text" className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold" onChange={e => setNewProgram({...newProgram, title: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Value / Price</label>
                    <input type="text" className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold" onChange={e => setNewProgram({...newProgram, price: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Context</label>
                    <textarea className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold h-24 resize-none" onChange={e => setNewProgram({...newProgram, description: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Key Features (CSV)</label>
                    <input type="text" className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold" onChange={e => setNewProgram({...newProgram, features: e.target.value})} />
                  </div>
                  <button onClick={addProgram} className="w-full py-4 bg-neutral-900 text-white rounded-lg font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all shadow-lg mt-2">Publish Program</button>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Event Title</label>
                    <input type="text" className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold" onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Date</label>
                      <input type="date" className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold" onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Location</label>
                      <input type="text" className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold" onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Description</label>
                    <textarea className="w-full bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200 outline-none focus:border-accent text-sm font-bold h-24 resize-none" onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                  </div>
                  <button onClick={addEvent} className="w-full py-4 bg-neutral-900 text-white rounded-lg font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all shadow-lg mt-2">Publish Event</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
