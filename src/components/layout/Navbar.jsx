import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Compass, LayoutDashboard, Map, LogOut } from 'lucide-react';
import { MEDIA } from '../../utils/constants';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Trip Planner', path: '/planner', icon: Map },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-[#18230F]/40 backdrop-blur-xl border-b border-white/10 px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="bg-[#27391C]/50 p-2 rounded-lg border border-[#255F38]/50 group-hover:bg-[#255F38]/80 transition-all shadow-inner">
            <Compass className="text-white h-5 w-5" strokeWidth={1.5} />
          </div>
          <span className="text-xl font-bold text-white tracking-widest uppercase drop-shadow-md">Lumina</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                  isActive
                    ? 'bg-[#1F7D53]/80 text-white border border-[#255F38] shadow-[0_0_15px_rgba(31,125,83,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-[#27391C]/50 border border-transparent'
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/10">
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-white leading-none drop-shadow-md">{user?.name || 'Traveler'}</span>
              <span className="text-xs text-slate-300 mt-1 font-medium tracking-wide uppercase">{user?.role || 'Explorer'}</span>
            </div>
            <img
              src={MEDIA.DEFAULT_AVATAR}
              alt="User Avatar"
              className="h-9 w-9 rounded-full border-2 border-[#255F38] object-cover shadow-lg"
            />
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-slate-300 hover:text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition-all"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;