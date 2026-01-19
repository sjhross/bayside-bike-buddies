import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-sm border border-slate-100">
                <Link to="/" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy for Bayside Bike Buddies</h1>

                <div className="prose prose-slate text-slate-600 leading-relaxed">
                    <p>
                        We only collect your name and email address via Google Sign-In to identify who has lodged a bike track and to prevent spam. We do not sell your data or use it for marketing. Data is stored securely via Supabase, and you can request data deletion at any time by contacting the developer.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
