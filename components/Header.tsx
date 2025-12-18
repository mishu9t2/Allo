
import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Home, Globe, User, Menu, X } from 'lucide-react';
import { COLORS } from '../constants';

interface HeaderProps {
  onHomeClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onProfileClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <div className="w-10 h-10 blue-gradient rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
            <span className="text-white font-montserrat text-2xl">A</span>
          </div>
          <span className="text-2xl font-montserrat text-blue-600 hidden sm:block">Allo</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search global communities..."
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
            />
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink icon={<Home className="w-6 h-6" />} label="Home" active onClick={onHomeClick} />
          <NavLink icon={<Globe className="w-6 h-6" />} label="Discover" />
          <NavLink icon={<MessageSquare className="w-6 h-6" />} label="Messages" />
          <NavLink icon={<Bell className="w-6 h-6" />} label="Alerts" badge={3} />
        </nav>

        {/* Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-6 py-2 orange-gradient text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all transform active:scale-95">
            Join Now
          </button>
          <div 
            className="w-10 h-10 rounded-full border-2 border-blue-400 p-0.5 cursor-pointer transform hover:scale-105 transition-transform"
            onClick={onProfileClick}
          >
            <img src="https://picsum.photos/seed/user1/100" className="w-full h-full rounded-full object-cover" alt="Profile" />
          </div>
          <button 
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 space-y-4 animate-in slide-in-from-top duration-300">
          <MobileNavLink icon={<Home />} label="Home" onClick={() => { onHomeClick?.(); setIsMobileMenuOpen(false); }} />
          <MobileNavLink icon={<Globe />} label="Discover" />
          <MobileNavLink icon={<MessageSquare />} label="Messages" />
          <MobileNavLink icon={<Bell />} label="Alerts" />
          <button className="w-full py-3 orange-gradient text-white rounded-xl font-bold">Sign Up Free</button>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ icon, label, active, badge, onClick }: { icon: React.ReactNode, label: string, active?: boolean, badge?: number, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors relative group ${active ? 'text-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
  >
    {icon}
    <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
    {badge && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">{badge}</span>}
    {active && <div className="absolute -bottom-4 w-full h-1 bg-blue-500 rounded-t-full" />}
  </div>
);

const MobileNavLink = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer"
  >
    <div className="text-blue-500">{icon}</div>
    <span className="font-semibold text-gray-700">{label}</span>
  </div>
);

export default Header;
