import { X, Upload, Loader2, Info, Search } from 'lucide-react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { difficultyLevels } from '../data/trails';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import LevelGuideModal from './LevelGuideModal';

const LodgeTrackModal = ({ isOpen, onClose, onSubmit }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        level: 0,
        description: '',
        lat: '',
        lng: '',
        address: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const handleSearchAddress = async (query) => {
        if (!query || query.length < 3) return;
        setIsSearching(true);
        try {
            const provider = new OpenStreetMapProvider({
                params: {
                    'accept-language': 'en',
                    countrycodes: 'au',
                    viewbox: '144.5,-37.5,145.6,-38.5', // Approximate bounds for Melbourne/Mornington
                    bounded: 1,
                    addressdetails: 1,
                }
            });
            const results = await provider.search({ query });
            setSearchResults(results);
        } catch (error) {
            console.error('Geocoding error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const selectAddress = (result) => {
        setFormData(prev => ({
            ...prev,
            lat: result.y,
            lng: result.x,
            address: result.label
        }));
        setSearchResults([]);
    };

    // ... (rest of the component logic)

    const handleSubmit = async (e) => {
        // ... same submit logic
        e.preventDefault();
        if (!user) return; // Should allow guard at parent level, but safety check

        try {
            setLoading(true);
            let imageUrl = null;

            // 1. Upload Image if exists
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('trail-photos')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('trail-photos')
                    .getPublicUrl(filePath);

                imageUrl = data.publicUrl;
            }

            // 2. Insert into DB
            const newTrail = {
                name: formData.name,
                level: formData.level,
                description: formData.description,
                lat: parseFloat(formData.lat),
                lng: parseFloat(formData.lng),
                image_url: imageUrl,
                user_id: user.id
            };

            const { data, error } = await supabase
                .from('trails')
                .insert([newTrail])
                .select()
                .single();

            if (error) throw error;

            onSubmit(data);
            setFormData({ name: '', level: 0, description: '', lat: '', lng: '', address: '' });
            setImageFile(null);
            onClose();

        } catch (error) {
            console.error('Error lodging track:', error);
            alert('Error saving track. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <h2 className="text-xl font-bold text-slate-800">Lodge a New Track</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Track Name</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                            placeholder="e.g. Hidden Valley Loop"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                        <div className="relative">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                    placeholder="Search street, suburb or place..."
                                    value={formData.address}
                                    onChange={(e) => {
                                        setFormData({ ...formData, address: e.target.value });
                                        handleSearchAddress(e.target.value);
                                    }}
                                />
                            </div>

                            {/* Search Results Dropdown */}
                            {searchResults.length > 0 && (
                                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-slate-100 max-h-60 overflow-y-auto">
                                    {searchResults.map((result, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 text-sm text-slate-700 transition-colors"
                                            onClick={() => selectAddress(result)}
                                        >
                                            {result.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {isSearching && (
                                <div className="absolute right-3 top-3">
                                    <Loader2 className="animate-spin text-slate-400" size={18} />
                                </div>
                            )}

                            {formData.lat && (
                                <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Coordinates set: {parseFloat(formData.lat).toFixed(4)}, {parseFloat(formData.lng).toFixed(4)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-semibold text-slate-700">Difficulty Level</label>
                            <button
                                type="button"
                                onClick={() => setIsGuideOpen(true)}
                                className="text-sky-600 hover:text-sky-700 text-xs font-semibold flex items-center gap-1 hover:underline"
                            >
                                <Info size={12} />
                                Level Guide
                            </button>
                        </div>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none bg-white"
                                value={formData.level}
                                onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })}
                            >
                                {Object.entries(difficultyLevels).map(([level, info]) => (
                                    <option key={level} value={level}>
                                        Level {level}: {info.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Helper text */}
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-100">
                            <span className="font-semibold block mb-1" style={{ color: difficultyLevels[formData.level].hex }}>
                                {difficultyLevels[formData.level].label}
                            </span>
                            {difficultyLevels[formData.level].desc}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Photo (Optional)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={e => setImageFile(e.target.files[0])}
                            />
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                <Upload size={24} />
                                <span className="text-sm font-medium text-slate-500">
                                    {imageFile ? imageFile.name : "Click to upload a photo"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                        <textarea
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[100px]"
                            placeholder="Describe the terrain, suitability, and any obstacles..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transform active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Track"
                            )}
                        </button>
                    </div>
                </form>

                <LevelGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
            </div>
        </div>
    );
};

export default LodgeTrackModal;
