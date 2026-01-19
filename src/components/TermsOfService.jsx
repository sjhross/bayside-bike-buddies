import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-sm border border-slate-100">
                <Link to="/" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service for Bayside Bike Buddies</h1>

                <div className="prose prose-slate text-slate-600 leading-relaxed">
                    <p>
                        By lodging tracks, you agree to provide accurate local information.
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2">Safety Disclaimer</h3>
                    <p>
                        All users ride at their own risk. Parents must exercise their own judgment regarding their children’s cycling abilities and current traffic/trail conditions. By uploading content, you grant us permission to display it on our public community map.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
