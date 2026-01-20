import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { difficultyLevels } from '../data/trails';

const ADMIN_EMAIL = 'seanjhross@gmail.com';

const AdminDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.email !== ADMIN_EMAIL) {
                navigate('/');
            } else {
                fetchTrails();
            }
        }
    }, [user, authLoading, navigate]);

    const fetchTrails = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('trails')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTrails(data || []);
        } catch (error) {
            console.error('Error fetching trails:', error);
            alert('Error fetching trails');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this track?')) return;

        try {
            const { error } = await supabase
                .from('trails')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTrails(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting trail:', error);
            alert('Error deleting trail');
        }
    };

    const toggleVisibility = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('trails')
                .update({ is_visible: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setTrails(prev => prev.map(t =>
                t.id === id ? { ...t, is_visible: !currentStatus } : t
            ));
        } catch (error) {
            console.error('Error updating visibility:', error);
            alert('Error updating visibility');
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                    <div className="text-sm text-slate-500">
                        Logged in as: <span className="font-mono text-slate-700">{user?.email}</span>
                    </div>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Track Name</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Submitted By</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Level</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                                    <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {trails.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-slate-400">
                                            No tracks found.
                                        </td>
                                    </tr>
                                ) : (
                                    trails.map(trail => (
                                        <tr key={trail.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-medium text-slate-800">
                                                {trail.name}
                                                <div className="text-xs text-slate-400 font-normal mt-0.5 truncate max-w-xs ">{trail.description}</div>
                                            </td>
                                            <td className="p-4 text-sm text-slate-600">
                                                {trail.contributor_email || <span className="italic text-slate-400">Unknown</span>}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className="inline-block px-2 py-1 rounded text-xs font-bold text-white"
                                                    style={{ backgroundColor: difficultyLevels[trail.level]?.hex || '#ccc' }}
                                                >
                                                    {trail.level}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`
                                                    inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                                    ${trail.is_visible !== false ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}
                                                `}>
                                                    {trail.is_visible !== false ? 'Visible' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => toggleVisibility(trail.id, trail.is_visible !== false)}
                                                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                                                        title={trail.is_visible !== false ? "Hide Track" : "Show Track"}
                                                    >
                                                        {trail.is_visible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(trail.id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete Track"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
