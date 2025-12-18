
import React, { useState } from 'react';
import Header from './components/Header';
import GlobeVisualization from './components/GlobeVisualization';
import PostCard from './components/PostCard';
import UserProfile from './components/UserProfile';
import { LeftSidebar, RightSidebar } from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { MOCK_POSTS, MOCK_USERS } from './constants';
import { User } from './types';
import { Image as ImageIcon, Video, MapPin, Send, Users as UsersIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  // For this exercise, User ID '1' is the logged-in user
  const currentUser = users.find(u => u.id === '1') || users[0];

  const handleUserClick = (user: User) => {
    // Find the latest version of the user from state in case they were edited
    const latestUser = users.find(u => u.id === user.id) || user;
    setSelectedUser(latestUser);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setSelectedUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        onHomeClick={handleHomeClick} 
        onProfileClick={() => handleUserClick(currentUser)} 
      />

      {/* Hero Section - Only on main feed */}
      {!selectedUser && (
        <section className="w-full bg-white border-b border-slate-100 overflow-hidden relative min-h-[500px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-8 z-10 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-montserrat text-slate-900 leading-[1.1]">
                Connecting the <span className="text-blue-500">World</span> through Every <span className="text-orange-500">Heartbeat.</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
                Experience the first truly global social platform where borders vanish and communities thrive. Join over 50 million global citizens today.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button className="px-10 py-4 blue-gradient text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-200 transform hover:-translate-y-1 transition-all text-lg">
                  Explore Communities
                </button>
                <button className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-lg">
                  How it Works
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
                <div className="text-center">
                  <p className="text-2xl font-montserrat text-slate-900">190+</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Countries</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <p className="text-2xl font-montserrat text-slate-900">50M+</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Users</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <p className="text-2xl font-montserrat text-slate-900">2.4B</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Connections</p>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
              <GlobeVisualization />
              
              {/* Floating avatars representing diverse people */}
              <div 
                className="absolute top-10 left-20 animate-float cursor-pointer hover:z-20"
                onClick={() => handleUserClick(users[2])}
              >
                <UserChip image={users[2].avatar} country={users[2].country} />
              </div>
              <div 
                className="absolute bottom-20 left-10 animate-float cursor-pointer hover:z-20" 
                style={{ animationDelay: '1s' }}
                onClick={() => handleUserClick(users[0])}
              >
                <UserChip image={users[0].avatar} country={users[0].country} />
              </div>
              <div 
                className="absolute top-40 right-10 animate-float cursor-pointer hover:z-20" 
                style={{ animationDelay: '0.5s' }}
                onClick={() => handleUserClick(users[3])}
              >
                <UserChip image={users[3].avatar} country={users[3].country} />
              </div>
            </div>
          </div>
          
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl -z-10 opacity-50" />
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8 w-full flex-1">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Content Area (Feed or Profile) */}
        <div className="flex-1 max-w-4xl">
          {selectedUser ? (
            <UserProfile 
              user={selectedUser} 
              onBack={handleHomeClick} 
              onUserClick={handleUserClick}
              onUpdateUser={handleUpdateUser}
              loggedInUserId="1"
            />
          ) : (
            <>
              {/* Create Post */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 max-w-2xl">
                <div className="flex gap-4 mb-4">
                  <img 
                    src={currentUser.avatar} 
                    className="w-12 h-12 rounded-2xl object-cover cursor-pointer hover:scale-105 transition-transform" 
                    alt="My avatar" 
                    onClick={() => handleUserClick(currentUser)} 
                  />
                  <div className="flex-1 bg-slate-50 rounded-2xl p-3 text-slate-400 cursor-text hover:bg-slate-100 transition-colors">
                    What's happening in your corner of the world, {currentUser.name.split(' ')[0]}?
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex gap-4">
                    <PostTool icon={<ImageIcon className="w-5 h-5" />} label="Photos" color="text-blue-500" />
                    <PostTool icon={<Video className="w-5 h-5" />} label="Videos" color="text-orange-500" />
                    <PostTool icon={<MapPin className="w-5 h-5" />} label="Location" color="text-green-500" />
                  </div>
                  <button className="px-6 py-2 blue-gradient text-white rounded-xl font-bold shadow-md transform hover:scale-105 transition-all">
                    Post
                  </button>
                </div>
              </div>

              {/* Feed Tabs */}
              <div className="flex items-center gap-6 mb-6 px-4">
                <button 
                  onClick={() => setActiveTab('feed')}
                  className={`pb-2 font-bold text-sm transition-all relative ${activeTab === 'feed' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Recent Activity
                  {activeTab === 'feed' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full" />}
                </button>
                <button 
                  onClick={() => setActiveTab('trending')}
                  className={`pb-2 font-bold text-sm transition-all relative ${activeTab === 'trending' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Trending Globally
                  {activeTab === 'trending' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full" />}
                </button>
              </div>

              {/* Post List */}
              <div className="space-y-6 max-w-2xl">
                {MOCK_POSTS.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onUserClick={handleUserClick} 
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </main>

      <ChatWindow />

      {/* Footer (Mobile only visible nav) */}
      <footer className="lg:hidden fixed bottom-0 w-full bg-white border-t py-3 px-6 flex justify-between items-center z-40">
        <FooterIcon icon={<ImageIcon className="w-6 h-6" />} active onClick={handleHomeClick} />
        <FooterIcon icon={<Video className="w-6 h-6" />} />
        <div className="w-14 h-14 blue-gradient rounded-full -mt-10 flex items-center justify-center text-white shadow-xl border-4 border-slate-50">
          <Send className="w-6 h-6" />
        </div>
        <FooterIcon icon={<MapPin className="w-6 h-6" />} />
        <FooterIcon icon={<UsersIcon className="w-6 h-6" />} />
      </footer>
    </div>
  );
};

const UserChip = ({ image, country }: { image: string, country: string }) => (
  <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl flex items-center gap-3 shadow-xl border border-white/50 cursor-pointer transform hover:scale-110 transition-transform">
    <img src={image} className="w-10 h-10 rounded-xl object-cover" alt={country} />
    <div className="pr-2">
      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{country}</p>
      <div className="flex gap-0.5">
        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-green-500 rounded-full" />)}
      </div>
    </div>
  </div>
);

const PostTool = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <div className={`${color} group-hover:scale-110 transition-transform`}>{icon}</div>
    <span className="text-xs font-bold text-slate-500">{label}</span>
  </div>
);

const FooterIcon = ({ icon, active, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className={`${active ? 'text-blue-500' : 'text-slate-400'}`}>
    {icon}
  </div>
);

export default App;
