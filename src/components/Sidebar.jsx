import { useState } from 'react';
import { Search, MapPin, Plus, Bike, Info } from 'lucide-react';
import { difficultyLevels } from '../data/trails';

import LevelGuideModal from './LevelGuideModal';

const Sidebar = ({ trails, onSearch, onFilter, selectedFilters, onLodgeClick, onTrailSelect, onAboutClick, error }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-sky-500 p-2 rounded-lg text-white">
                            <Bike size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Bayside<br />Bike Buddies</h1>
                    </div>
                    <button
                        onClick={onAboutClick}
                        className="text-slate-500 hover:text-sky-600 hover:bg-sky-50 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 text-sm font-medium border border-slate-200"
                    >
                        <Info size={16} />
                        <span>About</span>
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100 flex items-start gap-2">
                        <div className="flex-1">
                            <p className="font-bold">Connection Error</p>
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search for a track..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    <div className="w-full flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filter by Difficulty</p>
                        <button
                            onClick={() => setIsGuideOpen(true)}
                            className="text-sky-600 hover:text-sky-700 text-xs font-semibold flex items-center gap-1 hover:underline"
                        >
                            <Info size={12} />
                            Level Guide
                        </button>
                    </div>
                    {Object.entries(difficultyLevels).map(([level, info]) => {
                        const isSelected = selectedFilters.includes(parseInt(level));
                        return (
                            <button
                                key={level}
                                onClick={() => onFilter(parseInt(level))}
                                className={`
                  px-3 py-1.5 rounded-full text-xs font-semibold transition-all border
                  ${isSelected
                                        ? `bg-slate-800 text-white border-slate-800 shadow-md`
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                `}
                            >
                                {info.label} ({level})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {trails.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                        <p>No tracks found matching your criteria.</p>
                    </div>
                ) : (
                    trails.map(trail => (
                        <div
                            key={trail.id}
                            onClick={() => onTrailSelect(trail)}
                            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-sky-100 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{trail.name}</h3>
                                <span
                                    className="text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                                    style={{ backgroundColor: difficultyLevels[trail.level].hex }}
                                >
                                    Level {trail.level}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">{trail.description}</p>
                            <div className="flex items-center text-xs text-slate-400 font-medium">
                                <MapPin size={14} className="mr-1" />
                                <span className="text-slate-500">View on Map</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Lodge Button */}
            <div className="p-4 bg-white border-t border-slate-200">
                <button
                    onClick={onLodgeClick}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Lodge a Track
                </button>
            </div>

            <LevelGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        </div>
    );
};

export default Sidebar;
