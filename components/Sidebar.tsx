
import React from 'react';
import { Users, Calendar, Hash, Bookmark, Settings, TrendingUp } from 'lucide-react';
import { MOCK_COMMUNITIES } from '../constants';

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-64 hidden xl:block flex-shrink-0 space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-montserrat text-lg mb-4 text-slate-800">For You</h3>
        <nav className="space-y-1">
          <SidebarItem icon={<Users className="w-5 h-5 text-blue-500" />} label="Communities" active />
          <SidebarItem icon={<Calendar className="w-5 h-5 text-orange-500" />} label="Global Events" />
          <SidebarItem icon={<Hash className="w-5 h-5 text-purple-500" />} label="Trends" />
          <SidebarItem icon={<Bookmark className="w-5 h-5 text-green-500" />} label="Saved Posts" />
          <SidebarItem icon={<Settings className="w-5 h-5 text-slate-500" />} label="Settings" />
        </nav>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-montserrat text-lg text-slate-800">Communities</h3>
          <TrendingUp className="w-4 h-4 text-blue-500" />
        </div>
        <div className="space-y-4">
          {MOCK_COMMUNITIES.map(comm => (
            <div key={comm.id} className="flex items-center gap-3 cursor-pointer group">
              <img src={comm.image} className="w-10 h-10 rounded-xl object-cover" alt={comm.name} />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700 group-hover:text-blue-500 transition-colors">{comm.name}</p>
                <p className="text-[10px] text-slate-400 font-semibold">{(comm.members / 1000).toFixed(0)}K members</p>
              </div>
            </div>
          ))}
          <button className="w-full text-blue-500 text-sm font-bold hover:underline py-2">View All</button>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </div>
);

export const RightSidebar: React.FC = () => {
  return (
    <aside className="w-80 hidden lg:block flex-shrink-0 space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-montserrat text-lg mb-4 text-slate-800">Who to follow</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <img src={`https://picsum.photos/seed/p${i}/100`} className="w-12 h-12 rounded-full object-cover" alt="User" />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">User_{i}</p>
                <p className="text-xs text-slate-400">@global_user_{i}</p>
              </div>
              <button className="px-4 py-1.5 border-2 border-blue-100 text-blue-500 text-xs font-bold rounded-full hover:bg-blue-50 transition-colors">Follow</button>
            </div>
          ))}
        </div>
      </div>

      <div className="blue-gradient rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="font-montserrat text-xl mb-2">Host Global Live</h3>
          <p className="text-sm opacity-80 mb-4">Start a video broadcast and connect with people from 190+ countries.</p>
          <button className="w-full py-3 bg-white text-blue-600 rounded-2xl font-bold shadow-lg transform group-hover:-translate-y-1 transition-transform">Go Live Now</button>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
      </div>
    </aside>
  );
};
