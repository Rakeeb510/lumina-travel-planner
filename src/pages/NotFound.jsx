import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Map, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-2xl relative"
      >
        {/* Background glow effects */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#1F7D53] to-[#255F38] rounded-[3rem] blur-2xl opacity-20 animate-pulse"></div>
        
        {/* Heavy Glassmorphism Card */}
        <div className="relative bg-[#18230F]/20 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-16 text-center shadow-[0_8px_32px_0_rgba(24,35,15,0.6)]">
          
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -15, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <Compass className="h-24 w-24 md:h-32 md:w-32 text-[#4ade80] drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" strokeWidth={1} />
              <Map className="absolute -bottom-4 -right-4 h-12 w-12 text-[#1F7D53] opacity-80" strokeWidth={1.5} />
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-4 drop-shadow-lg">
            404
          </h1>
          
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-wide">
            Off the Beaten Path
          </h2>
          
          <p className="text-sm md:text-base text-slate-300 max-w-md mx-auto mb-10 leading-relaxed">
            The destination you are looking for seems to have vanished from our maps. Let's get you back on track.
          </p>

          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1F7D53] to-[#255F38] text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-sm border border-[#4ade80]/30 shadow-[0_0_20px_rgba(31,125,83,0.4)] hover:shadow-[0_0_30px_rgba(31,125,83,0.6)] transition-shadow"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;