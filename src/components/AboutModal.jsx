import { X, Coffee } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200 p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 p-1 rounded-full"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">About Bayside Bike Buddies</h2>

                    <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-left">
                        <p className="font-semibold text-center text-slate-800 text-base">
                            A map for parents in the bayside suburbs<br />made by a parent in the bayside suburbs.
                        </p>

                        <p>
                            I made this because I found it really hard to find a one-stop website for cycling options while my little guy had learned to ride, but was still growing in confidence for places to tackle with me.
                        </p>
                        <p>
                            It's designed for kids who are beyond you running behind them while they ride, but still finding their way on the bike.
                        </p>
                        <p>
                            <strong>Know somewhere you think people should know about?</strong> Add it to the map, all you need is a Google login.
                        </p>
                    </div>

                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-100 text-left mt-6">
                        <h3 className="font-bold text-sky-800 text-sm mb-2 flex items-center gap-2">
                            Future additions to come soon:
                        </h3>
                        <ul className="text-sky-700 text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <Coffee size={16} className="mt-0.5 shrink-0" />
                                <span>An option to let people know if there are coffee options nearby</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500 text-left">
                        <p className="font-medium text-slate-700">Ideas or want to sponsor it?</p>
                        <a href="mailto:seanjhross@gmail.com" className="text-sky-600 hover:underline">seanjhross@gmail.com</a>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default AboutModal;
