import Navbar from './Navbar';
import { MEDIA } from '../../utils/constants';

const MainLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex flex-col font-sans text-slate-100 selection:bg-[#1F7D53] selection:text-white relative bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${MEDIA.HERO_BG})` }}
    >
      {/* Deep forest green glass overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#18230F]/60 backdrop-blur-[4px] z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;