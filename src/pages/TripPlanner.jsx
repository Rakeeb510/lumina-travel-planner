import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Map, Calendar, Users, MapPin, Clock, CheckCircle, Wallet, ArrowRight, Plane, Coffee, Building, ChevronRight, Heart, Image as ImageIcon, Calculator, Star, MessageSquare } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { generateTripItinerary } from '../services/api';
import { MEDIA } from '../utils/constants';
import toast from 'react-hot-toast';

// --- ZOD VALIDATION SCHEMA FOR BOOKING ---
const bookingSchema = z.object({
  destination: z.string().min(2, "Destination is required"),
  dates: z.string().min(1, "Travel dates are required"),
  guests: z.string().min(1, "Number of guests is required"),
  travelStyle: z.string().min(1, "Please select a travel style")
});

// --- REUSABLE GLASS COMPONENT ---
const GlassBox = ({ children, className = "" }) => (
  <div className={`bg-[#18230F]/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(24,35,15,0.7)] rounded-3xl transition-all duration-300 hover:bg-[#18230F]/30 ${className}`}>
    {children}
  </div>
);

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
};

const TripPlanner = () => {
  const [activeTab, setActiveTab] = useState('itinerary'); 
  const [activeDay, setActiveDay] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [budgetMultiplier, setBudgetMultiplier] = useState(1);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // React Query Mutation for API Integration
  const { mutate, isPending } = useMutation({
    mutationFn: generateTripItinerary,
    onSuccess: (response) => {
      setGeneratedData(response.data);
      setIsBooked(true);
    },
    onError: (error) => {
      console.error("Failed to generate itinerary:", error);
    }
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const itinerary = [
    {
      day: 1,
      title: "Arrival & City Orientation",
      activities: [
        { time: "10:00 AM", title: "Airport Transfer", type: 'travel', icon: Plane, desc: "Private VIP transfer to the hotel." },
        { time: "02:00 PM", title: "Check-in & Rest", type: 'stay', icon: Building, desc: "Settle into your luxury suite." },
        { time: "06:30 PM", title: "Welcome Dinner", type: 'food', icon: Coffee, desc: "Exclusive dining experience at the sky lounge." }
      ]
    },
    {
      day: 2,
      title: "Cultural Immersion",
      activities: [
        { time: "09:00 AM", title: "Guided Historic Tour", type: 'tour', icon: MapPin, desc: "Private walking tour of the old city." },
        { time: "01:00 PM", title: "Local Cuisine Tasting", type: 'food', icon: Coffee, desc: "Curated lunch at a hidden gem." }
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <p className="text-slate-300 text-xs font-bold tracking-[0.2em] uppercase mb-2 drop-shadow-md">
            Trip Architect
          </p>
          <h1 className="text-3xl sm:text-4xl font-light text-white tracking-wide drop-shadow-lg">
            Design your <span className="font-bold text-[#1F7D53] bg-clip-text text-transparent bg-gradient-to-r from-[#1F7D53] to-[#4ade80]">Next Adventure</span>
          </h1>
        </div>
        <button 
          onClick={() => {
            setIsWishlisted(!isWishlisted);
            if (!isWishlisted) toast.success('Added to Wishlist!');
            else toast('Removed from Wishlist', { icon: '💔' });
          }}
          className={`mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all ${isWishlisted ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-[#18230F]/40 text-slate-300 border-white/20 hover:bg-[#18230F]/60'}`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
          {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* LEFT COLUMN: Main Content Area (Spans 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Content Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {[
              { id: 'itinerary', icon: Calendar, label: 'Itinerary' },
              { id: 'map', icon: MapPin, label: 'Interactive Map' },
              { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
              { id: 'hotels', icon: Building, label: 'Hotel Cards' },
              { id: 'reviews', icon: MessageSquare, label: 'Reviews' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-[#1F7D53] to-[#255F38] text-white shadow-[0_0_15px_rgba(31,125,83,0.4)] border border-[#4ade80]/30' : 'bg-[#18230F]/40 text-slate-400 border border-white/20 hover:text-white hover:bg-[#18230F]/60'}`}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </div>

          <GlassBox className="p-6 sm:p-8 min-h-[500px]">
            {activeTab === 'itinerary' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-white/10 pb-6 gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <Clock className="text-[#4ade80]" /> Daily Schedule
                  </h2>
                  <div className="flex gap-2">
                {[1, 2, 3].map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`h-10 w-10 rounded-xl font-bold flex items-center justify-center transition-all ${
                      activeDay === day 
                        ? 'bg-gradient-to-r from-[#1F7D53] to-[#255F38] text-white shadow-[0_0_15px_rgba(31,125,83,0.5)]' 
                        : 'bg-[#18230F]/50 text-slate-400 hover:text-white border border-white/10 hover:border-[#1F7D53]/50'
                    }`}
                  >
                    D{day}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative border-l-2 border-[#255F38]/30 ml-4 pl-8 space-y-8">
              <AnimatePresence mode="wait">
                {itinerary.filter(d => d.day === activeDay).map((dayData) => (
                  <motion.div
                    key={dayData.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 tracking-wide">{dayData.title}</h3>
                    
                    <div className="space-y-8">
                      {dayData.activities.map((act, idx) => {
                        const Icon = act.icon;
                        return (
                          <div key={idx} className="relative group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-[#18230F] border-2 border-[#1F7D53] group-hover:bg-[#1F7D53] group-hover:shadow-[0_0_10px_rgba(31,125,83,0.8)] transition-all duration-300"></div>
                            
                            <div className="bg-[#27391C]/30 border border-white/5 hover:border-[#255F38]/50 rounded-2xl p-5 transition-all shadow-lg group-hover:bg-[#27391C]/50">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                                  <Icon className="h-5 w-5 text-[#4ade80]" />
                                  {act.title}
                                </h4>
                                <span className="text-slate-400 text-xs font-bold tracking-widest bg-[#18230F]/60 px-3 py-1 rounded-lg flex items-center gap-1.5 border border-white/5">
                                  <Clock className="h-3 w-3" /> {act.time}
                                </span>
                              </div>
                              <p className="text-slate-400 text-sm">{act.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
              </motion.div>
            )}

            {/* Interactive Map Tab */}
            {activeTab === 'map' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[400px] rounded-2xl overflow-hidden relative border border-white/20 shadow-lg bg-[#0A0F06]">
                {/* Embedded Google Map */}
                <iframe 
                  title="Interactive Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585975852!2d79.78616447833054!3d6.921838612716172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  className="absolute inset-0 w-full h-full border-0 filter invert-[95%] hue-rotate-[160deg] contrast-[85%] sepia-[20%] opacity-80" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Floating Map Label */}
                <div className="absolute top-4 left-4 bg-[#18230F]/80 backdrop-blur-md border border-[#4ade80]/50 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg pointer-events-none flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#4ade80]" /> Colombo, LK
                </div>
              </motion.div>
            )}

            {/* Image Gallery Tab */}
            {activeTab === 'gallery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative h-48 rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
                   <img src={MEDIA.DESTINATIONS.KYOTO} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 1" />
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
                   <img src={MEDIA.DESTINATIONS.ALPS} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 2" />
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
                   <img src={MEDIA.DESTINATIONS.SANTORINI} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 3" />
                </div>
              </motion.div>
            )}

            {/* Hotel Cards Tab */}
            {activeTab === 'hotels' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-6">Curated Accommodations</h2>
                {[
                  { name: "Lumina Grand Hotel", price: "$450", img: MEDIA.DESTINATIONS.KYOTO },
                  { name: "Alpine Luxury Resort", price: "$820", img: MEDIA.DESTINATIONS.ALPS }
                ].map((hotel, idx) => (
                  <div key={idx} className="bg-[#18230F]/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 hover:border-[#4ade80]/40 transition-all cursor-pointer shadow-lg">
                    <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                      <img src={hotel.img} className="w-full h-full object-cover hover:scale-105 transition-transform" alt="Hotel" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-bold text-lg">{hotel.name}</h4>
                          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-[#18230F]/60 px-2 py-1 rounded-md border border-white/5">
                            <Star className="h-3 w-3 fill-amber-400" /> 5.0
                          </div>
                        </div>
                        <p className="text-slate-400 text-xs mt-1"><MapPin className="inline h-3 w-3 text-[#1F7D53]" /> Premium Location</p>
                      </div>
                      <div className="flex justify-between items-end mt-4 sm:mt-0">
                        <span className="text-[#4ade80] font-bold text-lg">{hotel.price} <span className="text-slate-500 text-xs font-normal">/night</span></span>
                        <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#4ade80] transition-colors">Select Room</button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                
                {/* Submit Review Form */}
                <div className="bg-[#18230F]/40 border border-white/10 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4">Leave a Review</h3>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 text-slate-500 hover:text-amber-400 hover:fill-amber-400 cursor-pointer transition-colors" />
                    ))}
                  </div>
                  <textarea 
                    placeholder="Share your experience with this itinerary..." 
                    className="w-full bg-[#18230F]/60 border border-white/10 text-white placeholder:text-slate-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#1F7D53] transition-all min-h-[100px] mb-4"
                  ></textarea>
                  <button 
                    onClick={() => toast.success('Review submitted successfully!')}
                    className="bg-gradient-to-r from-[#1F7D53] to-[#255F38] text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(31,125,83,0.3)] hover:shadow-[0_0_25px_rgba(31,125,83,0.5)] border border-[#4ade80]/30 transition-all"
                  >
                    Submit Review
                  </button>
                </div>

                {/* Display Existing Reviews */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Feedback</h3>
                  
                  <div className="bg-[#18230F]/30 border border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-bold text-sm">Kavindi M.</h4>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-2">"The curated hotel options were exceptional. The budget calculator really helped us stay on track while exploring Colombo!"</p>
                    <span className="text-slate-500 text-xs">Reviewed on Aug 5, 2026</span>
                  </div>

                  <div className="bg-[#18230F]/30 border border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-bold text-sm">Aarav K.</h4>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-2">"Lumina's day-by-day planner took all the stress out of our luxury trip. Highly recommend the interactive map feature."</p>
                    <span className="text-slate-500 text-xs">Reviewed on Jul 28, 2026</span>
                  </div>
                </div>

              </motion.div>
            )}

          </GlassBox>
        </div>

        {/* RIGHT COLUMN: Booking Form & Budget (Spans 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dynamic Budget Calculator */}
          <motion.div variants={itemVariants}>
            <GlassBox className="p-6 group transition-colors">
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-[#1F7D53]/20 p-3 rounded-xl border border-[#1F7D53]/30">
                  <Calculator className="h-5 w-5 text-[#4ade80]" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Budget Calculator</p>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    ${(3450 * budgetMultiplier).toLocaleString()} <span className="text-slate-500 text-xs font-medium">/est. total</span>
                  </h3>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                  <span>Economy</span>
                  <span className="text-[#4ade80]">Ultra-Luxury</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" max="2.5" step="0.1" 
                  value={budgetMultiplier}
                  onChange={(e) => setBudgetMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-[#4ade80] bg-[#18230F] rounded-lg appearance-none h-2 cursor-pointer outline-none border border-white/10"
                />
              </div>
            </GlassBox>
          </motion.div>

          {/* Booking Form Engine */}
          <motion.div variants={itemVariants}>
            <GlassBox className="p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1F7D53] to-[#4ade80]"></div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Trip Requirements</h2>
              <p className="text-slate-400 text-sm mb-6">Finalize your details to generate the official itinerary.</p>

              {isBooked ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1F7D53]/20 border border-[#1F7D53]/50 rounded-2xl p-8 text-center flex flex-col items-center"
                >
                  <CheckCircle className="h-16 w-16 text-[#4ade80] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Itinerary Generated!</h3>
                  <p className="text-slate-300 text-sm mb-6">Your luxury travel plan has been saved to your dashboard.</p>
                  <button onClick={() => setIsBooked(false)} className="text-[#4ade80] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                    Plan Another Trip
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 block">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                      <input
                        {...register('destination')}
                        type="text"
                        placeholder="e.g. Kyoto, Japan"
                        className="w-full bg-[#18230F]/60 border border-white/10 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1F7D53] transition-all"
                      />
                    </div>
                    {errors.destination && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.destination.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 block">Dates</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                        <input
                          {...register('dates')}
                          type="text"
                          placeholder="Aug 12 - 18"
                          className="w-full bg-[#18230F]/60 border border-white/10 text-white placeholder:text-slate-500 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#1F7D53] transition-all"
                        />
                      </div>
                      {errors.dates && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.dates.message}</p>}
                    </div>
                    
                    <div>
                      <label className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 block">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                        <select
                          {...register('guests')}
                          className="w-full bg-[#18230F]/60 border border-white/10 text-white rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#1F7D53] transition-all appearance-none"
                        >
                          <option value="">Select</option>
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="4">Group (3-5)</option>
                        </select>
                      </div>
                      {errors.guests && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.guests.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 block">Travel Style</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {['Luxury', 'Adventure', 'Cultural', 'Relaxation'].map((style) => (
                        <label key={style} className="cursor-pointer relative">
                          <input type="radio" value={style} {...register('travelStyle')} className="peer sr-only" />
                          <div className="bg-[#18230F]/60 border border-white/10 text-slate-400 rounded-xl py-2.5 text-center text-sm font-bold peer-checked:bg-[#1F7D53]/20 peer-checked:border-[#1F7D53] peer-checked:text-white transition-all">
                            {style}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.travelStyle && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.travelStyle.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-[#1F7D53] to-[#255F38] text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(31,125,83,0.3)] hover:shadow-[0_0_30px_rgba(31,125,83,0.5)] border border-[#4ade80]/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isPending ? 'Generating Itinerary...' : 'Generate Itinerary'}
                    {!isPending && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              )}
            </GlassBox>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TripPlanner;