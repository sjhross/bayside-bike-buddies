import { X } from 'lucide-react';
import { difficultyLevels } from '../data/trails';

const LevelGuideModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const definitions = {
        0: "Balance & Beginners – Perfectly flat, paved, and wide. Ideal for toddlers on balance bikes or kids just learning to pedal without training wheels. No hills, no traffic.",
        1: "Easy Cruiser – Mostly flat with very gentle slopes. Great for younger kids who can brake reliably. May have minor road crossings or shared paths.",
        2: "Confident Explorers – Some small hills and varied terrain (smooth gravel or bitumen). Best for primary schoolers who have mastered their gears and have some stamina.",
        3: "Adventure Seekers – Expect moderate inclines, tighter turns, or longer distances. Requires good bike control and fitness.",
        4: "Trail Pros – Steep sections, rougher surfaces, or complex navigation. For older kids or teens who are comfortable with light mountain biking or long-distance coastal treks."
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200 p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 p-1 rounded-full"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Family Trail Scale</h2>
                    <p className="text-slate-500 text-sm">Find the perfect ride for your little one</p>
                </div>

                <div className="space-y-4">
                    {Object.entries(difficultyLevels).map(([level, info]) => (
                        <div key={level} className="flex gap-4 p-3 rounded-xl border border-slate-100 items-start hover:border-slate-200 transition-colors bg-slate-50/50">
                            <div className="shrink-0 flex flex-col items-center gap-1 mt-1">
                                <span
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
                                    style={{ backgroundColor: info.hex }}
                                >
                                    {level}
                                </span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-slate-800 text-base">{info.label}</h3>
                                <p className="text-slate-600 text-sm leading-snug mt-1">
                                    {definitions[level]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg mt-6"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default LevelGuideModal;
