import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Plane, CreditCard, ChevronRight, Search, Star, Navigation, Globe, Building, Wallet, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MEDIA } from '../utils/constants';

// --- ADVANCED 3D TILT GLASS CARD COMPONENT ---
const GlassCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full h-full bg-[#18230F]/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(24,35,15,0.7)] group hover:bg-[#18230F]/20 hover:border-[#4ade80]/40 transition-all duration-500 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- NEW FLUID ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
  show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const Dashboard = () => {
  const { user } = useAuth();

  const destinations = [
    { name: 'Kyoto, Japan', image: MEDIA.DESTINATIONS.KYOTO, rating: '4.9', price: '$1,200', tags: ['Culture', 'Serenity'] },
    { name: 'Santorini, Greece', image: MEDIA.DESTINATIONS.SANTORINI, rating: '4.9', price: '$1,850', tags: ['Luxury', 'Coastal'] },
  ];

  const hotels = [
    { name: 'Aman Kyoto', location: 'Kyoto', rating: '5.0', price: '$850/nt' },
    { name: 'The Chedi Andermatt', location: 'Swiss Alps', rating: '4.8', price: '$620/nt' },
  ];

  return (
    <div className="space-y-10 pb-12 perspective-[2000px]">
      {/* Search & Greeting Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="overflow-hidden">
          <motion.p variants={fadeUpVariants} className="text-slate-300 text-xs font-bold tracking-[0.2em] uppercase mb-2 drop-shadow-md">
            Welcome Back
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide flex flex-wrap items-center gap-2 md:gap-3 drop-shadow-lg">
            Explore the world, <span className="font-bold text-[#1F7D53] bg-clip-text text-transparent bg-gradient-to-r from-[#1F7D53] to-[#4ade80]">{user?.name?.split(' ')[0] || 'Traveler'}</span>.
          </motion.h1>
        </div>

        <motion.div variants={scaleInVariants} className="relative group w-full md:w-96 z-20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1F7D53] to-[#255F38] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-700"></div>
          <div className="relative flex items-center bg-[#18230F]/50 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 transition-all duration-300 shadow-xl">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              className="bg-transparent border-none outline-none text-white w-full ml-3 placeholder:text-slate-400 text-sm"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Glass Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {/* Large Featured Card */}
        <motion.div variants={scaleInVariants} className="md:col-span-2 lg:col-span-2 row-span-2 h-[420px]">
          <GlassCard className="rounded-3xl overflow-hidden">
            <motion.img 
              src={MEDIA.DESTINATIONS.ALPS} 
              alt="Swiss Alps" 
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18230F] via-[#18230F]/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="bg-[#1F7D53]/80 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg border border-[#255F38]">
                  Next Departure
                </span>
                <span className="text-white text-xs font-medium tracking-widest flex items-center gap-1.5 drop-shadow-md">
                  <Navigation className="h-3 w-3 animate-pulse text-[#4ade80]" /> 14 Days
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tighter drop-shadow-2xl">Swiss Alps</h2>
              <p className="text-slate-200 max-w-md text-sm leading-relaxed drop-shadow-md">Prepare for breathtaking altitudes, luxury alpine lodges, and pristine snowboarding trails.</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Flight Itinerary Ticket */}
        <motion.div variants={scaleInVariants} className="md:col-span-1 lg:col-span-2 h-auto min-h-[200px]">
          <GlassCard className="rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700">
              <Plane className="h-64 w-64 text-white" strokeWidth={0.5} />
            </div>
            <h3 className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Active Itinerary</h3>
            
            <div className="flex items-center justify-between mt-2 relative z-10">
              <div>
                <p className="text-3xl font-light text-white">CMB</p>
                <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">Colombo</p>
              </div>
              
              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="w-full border-t-2 border-dashed border-[#255F38]/50 relative">
                  <Plane className="h-4 w-4 text-[#1F7D53] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-2">Direct • 9h 45m</p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-white">ZRH</p>
                <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">Zurich</p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
              <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                <CalendarIcon className="h-4 w-4 text-[#1F7D53]" /> Aug 22, 2026
              </div>
              <button className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:text-[#4ade80] transition-colors">
                Boarding Pass <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Budget Snapshot */}
        <motion.div variants={scaleInVariants} className="h-[200px]">
          <GlassCard className="rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-[#27391C]/60 p-3 rounded-2xl border border-[#255F38]/50 shadow-inner">
                <Wallet className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Trip Budget</p>
              <h3 className="text-3xl font-bold text-white drop-shadow-md">$4,250</h3>
              <div className="w-full bg-[#18230F]/80 h-1.5 rounded-full mt-3 overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-[#1F7D53] to-[#4ade80] w-[65%] h-full rounded-full shadow-[0_0_10px_rgba(31,125,83,0.8)]"></div>
              </div>
              <p className="text-slate-400 text-[10px] mt-2 tracking-widest">65% OF PLANNED USED</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Reward Points */}
        <motion.div variants={scaleInVariants} className="h-[200px]">
          <GlassCard className="rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-[#27391C]/60 p-3 rounded-2xl border border-[#255F38]/50 shadow-inner">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Lumina Rewards</p>
              <h3 className="text-3xl font-bold text-white drop-shadow-md">12.4k</h3>
              <p className="text-[#4ade80] font-bold text-[10px] tracking-[0.2em] uppercase mt-2 drop-shadow-md">
                +450 THIS MONTH
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Expanded Sections: Destinations & Hotels */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4"
      >
        {/* Exclusive Destinations */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-white drop-shadow-md">Exclusive Destinations</h2>
            <button className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
              View Map <MapPin className="h-3 w-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((dest, index) => (
              <motion.div variants={scaleInVariants} key={index} className="h-[280px]">
                <GlassCard className="rounded-3xl overflow-hidden group cursor-pointer p-0">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#18230F] via-[#18230F]/50 to-transparent"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-end">
                      <div className="bg-[#18230F]/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10 shadow-xl">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        <span className="text-white font-bold text-xs">{dest.rating}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex gap-2 mb-3">
                        {dest.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] uppercase tracking-[0.2em] font-bold text-white bg-[#27391C]/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#255F38]/50 shadow-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-1 tracking-tight drop-shadow-lg">{dest.name}</h3>
                      <p className="text-slate-300 text-sm font-medium drop-shadow-md">{dest.price} <span className="text-slate-400 text-xs">/ person</span></p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Curated Stays / Hotels */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-white drop-shadow-md">Curated Stays</h2>
            <button className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
              All <Building className="h-3 w-3" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {hotels.map((hotel, index) => (
              <motion.div variants={scaleInVariants} key={index}>
                <div className="bg-[#18230F]/40 backdrop-blur-xl border border-white/10 hover:border-[#255F38]/50 rounded-2xl p-4 flex items-center gap-4 group cursor-pointer transition-colors shadow-lg">
                  <div className="h-16 w-16 rounded-xl bg-[#27391C]/50 border border-[#255F38]/50 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Building className="h-6 w-6 text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm tracking-wide drop-shadow-md">{hotel.name}</h4>
                    <p className="text-slate-400 text-xs mt-1 tracking-wider">{hotel.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-xs font-bold text-white drop-shadow-md">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {hotel.rating}
                    </div>
                    <p className="text-slate-400 text-[10px] mt-1 tracking-widest">{hotel.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.button 
              variants={scaleInVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#1F7D53] to-[#255F38] text-white font-bold py-4 rounded-xl text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(31,125,83,0.3)] hover:shadow-[0_0_30px_rgba(31,125,83,0.5)] transition-all mt-2 border border-[#4ade80]/30"
            >
              Launch Trip Planner
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;