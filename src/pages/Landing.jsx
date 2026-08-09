import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Star, TrendingUp, ShieldCheck, Globe, MapPin, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MEDIA } from '../utils/constants';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// Reusable Deep Glass Card
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-[#18230F]/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(24,35,15,0.7)] rounded-3xl transition-all duration-300 hover:bg-[#18230F]/30 ${className}`}>
    {children}
  </div>
);

const Landing = () => {
  const containerRef = useRef(null);

  // --- SCROLL ANIMATION HOOKS ---
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to opacities for seamless background crossfading
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const bg2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.65, 0.75], [0, 1, 1, 0]);
  const bg3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="text-white selection:bg-[#1F7D53] font-sans relative">
      
      {/* --- DYNAMIC SCROLLING BACKGROUNDS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#0A0F06]">
        <motion.img style={{ opacity: bg1Opacity }} src={MEDIA.HERO_BG} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
        <motion.img style={{ opacity: bg2Opacity }} src={MEDIA.DESTINATIONS.ALPS} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
        <motion.img style={{ opacity: bg3Opacity }} src={MEDIA.DESTINATIONS.KYOTO} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
        
        {/* Global Glass Overlay */}
        <div className="absolute inset-0 bg-[#18230F]/70 backdrop-blur-[8px]"></div>
      </div>

      <div className="relative z-10">
        {/* --- PUBLIC NAVIGATION (Slimmer & Sleeker) --- */}
        <nav className="fixed top-0 w-full z-50 bg-[#18230F]/50 backdrop-blur-2xl border-b border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#27391C]/50 p-1.5 rounded-md border border-[#255F38]/50 shadow-inner">
                <Compass className="text-white h-4 w-4" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-bold tracking-widest uppercase text-white drop-shadow-md">Lumina</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/login" className="hidden sm:block text-slate-300 hover:text-white text-xs font-bold tracking-wider uppercase transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-[#1F7D53] to-[#255F38] px-4 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(31,125,83,0.3)] hover:shadow-[0_0_20px_rgba(31,125,83,0.5)] border border-[#4ade80]/30 transition-all text-center">
                Start Planning
              </Link>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-4xl">
              <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18230F]/40 border border-white/20 backdrop-blur-2xl mb-8 shadow-lg">
                <Globe className="h-4 w-4 text-[#4ade80]" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#4ade80]">Next-Gen Travel AI</span>
              </motion.div>
              
              <motion.h1 variants={fadeUpVariants} className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight mb-6 drop-shadow-xl">
                Curate the extraordinary with <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1F7D53] to-[#4ade80]">Lumina.</span>
              </motion.h1>
              
              <motion.p variants={fadeUpVariants} className="text-base sm:text-lg text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Experience the world's most intelligent luxury travel planner. We design flawless, personalized itineraries in seconds, leaving you to focus on the journey.
              </motion.p>
              
              <motion.div variants={fadeUpVariants}>
                <Link to="/register" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/30 text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-white/20 hover:border-white/50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Design Your Trip <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- HOW IT WORKS & STATS --- */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Stats / Graph Side */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 drop-shadow-md">Data-driven perfection.</h2>
                
                <GlassCard className="p-6 sm:p-8">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-slate-300 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1">Customer Satisfaction</p>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">99.8%</h3>
                    </div>
                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-[#4ade80]" />
                  </div>
                  
                  {/* Visual Scatter Graph */}
                  <div className="relative h-32 sm:h-40 mt-8 w-full border-b border-l border-white/20">
                    {[
                      { x: 10, y: 20 }, { x: 20, y: 45 }, { x: 30, y: 35 }, { x: 40, y: 60 },
                      { x: 50, y: 55 }, { x: 60, y: 80 }, { x: 70, y: 70 }, { x: 80, y: 90 },
                      { x: 90, y: 98 }
                    ].map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#4ade80] rounded-full shadow-[0_0_12px_#4ade80] cursor-pointer hover:scale-150 transition-transform z-10"
                        style={{ left: `${point.x}%`, bottom: `${point.y}%`, transform: 'translate(-50%, 50%)' }}
                      >
                        <div className="absolute opacity-0 hover:opacity-100 bg-[#18230F]/80 backdrop-blur-md border border-[#255F38] text-[#4ade80] text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md -top-8 -left-3 pointer-events-none transition-opacity shadow-lg">
                          {point.y}%
                        </div>
                      </motion.div>
                    ))}
                    {/* Trend Line (SVG) */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
                      <motion.path 
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d="M 10 80 L 20 55 L 30 65 L 40 40 L 50 45 L 60 20 L 70 30 L 80 10 L 90 2" 
                        fill="none" 
                        stroke="#4ade80" 
                        strokeWidth="2" 
                        strokeDasharray="6 6"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <GlassCard className="p-4 sm:p-6 text-center">
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-md">10k+</h4>
                    <p className="text-slate-300 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">Itineraries Built</p>
                  </GlassCard>
                  <GlassCard className="p-4 sm:p-6 text-center">
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-md">4.9/5</h4>
                    <p className="text-slate-300 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">Global Rating</p>
                  </GlassCard>
                </div>
              </motion.div>

              {/* How It Works Side */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-md">How Lumina Works</h2>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-[#18230F]/40 backdrop-blur-xl p-3 rounded-xl border border-white/20 shrink-0 shadow-lg">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 drop-shadow-sm">1. Define Your Vision</h3>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">Input your destination, dates, and travel style. Whether you seek high-altitude adventure or coastal serenity, we map it out.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-[#18230F]/40 backdrop-blur-xl p-3 rounded-xl border border-white/20 shrink-0 shadow-lg">
                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 drop-shadow-sm">2. AI Optimization</h3>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">Our engine cross-references thousands of luxury stays, private flights, and exclusive experiences to build a flawless schedule.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-[#18230F]/40 backdrop-blur-xl p-3 rounded-xl border border-white/20 shrink-0 shadow-lg">
                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 drop-shadow-sm">3. Approve & Embark</h3>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">Review your dynamic itinerary, adjust budgets in real-time, and let our concierge layer handle the actual bookings.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FEATURED DESTINATIONS --- */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-md">Trending Masterpieces</h2>
              <p className="text-slate-200 text-sm max-w-xl mx-auto drop-shadow-md">Discover the locations our elite travelers are booking this season.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Kyoto, Japan", img: MEDIA.DESTINATIONS.KYOTO, tag: "Cultural" },
                { name: "Swiss Alps", img: MEDIA.DESTINATIONS.ALPS, tag: "Adventure" },
                { name: "Sigiriya, LK", img: MEDIA.DESTINATIONS.SIGIRIYA, tag: "Nature & Heritage" }
              ].map((dest, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="h-full">
                  <GlassCard className="group relative overflow-hidden aspect-[4/5] sm:aspect-auto sm:h-[400px] cursor-pointer p-0">
                    <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18230F] via-[#18230F]/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                      <span className="bg-[#18230F]/60 backdrop-blur-md px-3 py-1 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-3 inline-block shadow-md">
                        {dest.tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">{dest.name}</h3>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- REVIEWS --- */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 drop-shadow-md">Traveler Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Eleanor V.", review: "Lumina generated a 14-day trip to Kyoto that felt like it was planned by a local expert. Flawless execution." },
                { name: "Marcus T.", review: "The budget tracking tool saved us thousands on our alpine ski trip. I will never travel without this dashboard again." },
                { name: "Sarah J.", review: "The glassmorphism UI is gorgeous, but the AI itinerary generation is pure magic. It knew exactly what pacing we needed." }
              ].map((review, i) => (
                <GlassCard key={i} className="p-6 sm:p-8 text-left hover:border-[#4ade80]/40">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400 drop-shadow-md" />)}
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 drop-shadow-sm">"{review.review}"</p>
                  <p className="text-white font-bold tracking-wide text-xs sm:text-sm drop-shadow-md">— {review.name}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-white/10 bg-[#18230F]/30 backdrop-blur-2xl pt-12 pb-8 px-4 sm:px-6 mt-10 text-center md:text-left">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-2.5 mb-4">
                <Compass className="text-[#4ade80] h-5 w-5 sm:h-6 sm:w-6 drop-shadow-md" />
                <span className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-white drop-shadow-md">Lumina</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm max-w-sm leading-relaxed drop-shadow-sm mx-auto md:mx-0">
                Elevating the standard of luxury travel through artificial intelligence and impeccable design.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm drop-shadow-md">Headquarters</h4>
              <ul className="space-y-3 text-slate-300 text-xs sm:text-sm inline-block text-left">
                <li className="flex items-center justify-start gap-2"><MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#4ade80] shrink-0" /> Koramangala, Bengaluru</li>
                <li className="flex items-center justify-start gap-2"><Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#4ade80] shrink-0" /> concierge@lumina.travel</li>
                <li className="flex items-center justify-start gap-2"><Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#4ade80] shrink-0" /> +91 80 4111 2222</li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm drop-shadow-md">Legal</h4>
              <ul className="space-y-3 text-slate-300 text-xs sm:text-sm inline-block text-center md:text-left">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-center border-t border-white/10 pt-8 text-slate-400 text-[10px] sm:text-xs tracking-widest uppercase">
            © 2026 Lumina Travel Technologies. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;