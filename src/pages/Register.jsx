import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MEDIA } from '../utils/constants';
import toast from 'react-hot-toast';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    login({ name: 'Traveler', role: 'Explorer' });
    toast.success('Account created successfully!');
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative bg-fixed bg-center bg-cover p-4"
      style={{ backgroundImage: `url(${MEDIA.HERO_BG})` }}
    >
      <div className="absolute inset-0 bg-[#0A0F06]/60 backdrop-blur-[6px] z-0"></div>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors bg-[#18230F]/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 hover:border-white/30"
      >
        <ArrowLeft className="h-4 w-4" /> Return Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-[#18230F]/20 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(24,35,15,0.7)]"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-[#27391C]/50 p-3 rounded-xl border border-[#255F38]/50 shadow-inner">
            <Compass className="text-[#4ade80] h-8 w-8" strokeWidth={1.5} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-white tracking-wide mb-2">Join Lumina</h2>
          <p className="text-slate-400 text-sm">Begin curating your extraordinary journeys.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full bg-[#18230F]/60 border border-white/10 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1F7D53] transition-all"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-[#18230F]/60 border border-white/10 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1F7D53] transition-all"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="password"
                required
                placeholder="Create Password"
                className="w-full bg-[#18230F]/60 border border-white/10 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1F7D53] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#1F7D53] to-[#255F38] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(31,125,83,0.3)] hover:shadow-[0_0_30px_rgba(31,125,83,0.5)] border border-[#4ade80]/30 text-sm tracking-widest uppercase mt-4"
          >
            Create Account <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-white font-bold hover:text-[#4ade80] transition-colors">Sign In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;