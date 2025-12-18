
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { MapPin, Calendar, Link as LinkIcon, MessageCircle, UserPlus, ArrowLeft, Edit3, Save, X, Camera } from 'lucide-react';
import PostCard from './PostCard';
import { MOCK_POSTS } from '../constants';

interface UserProfileProps {
  user: User;
  onBack: () => void;
  onUserClick: (user: User) => void;
  onUpdateUser?: (user: User) => void;
  loggedInUserId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBack, onUserClick, onUpdateUser, loggedInUserId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio || '');
  const [editedCover, setEditedCover] = useState(user.coverImage || '');
  const [editedAvatar, setEditedAvatar] = useState(user.avatar || '');

  // Update local state if the user prop changes (e.g. navigating to another profile)
  useEffect(() => {
    setEditedBio(user.bio || '');
    setEditedCover(user.coverImage || '');
    setEditedAvatar(user.avatar || '');
    setIsEditing(false);
  }, [user]);

  const isOwnProfile = user.id === loggedInUserId;
  const userPosts = MOCK_POSTS.filter(p => p.author.id === user.id);

  const handleSave = () => {
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        bio: editedBio,
        coverImage: editedCover,
        avatar: editedAvatar,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBio(user.bio || '');
    setEditedCover(user.coverImage || '');
    setEditedAvatar(user.avatar || '');
    setIsEditing(false);
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-slate-500 hover:text-blue-500 font-bold transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Feed
      </button>

      {/* Profile Header Card */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="h-48 sm:h-64 w-full relative group">
          <img 
            src={isEditing ? editedCover : (user.coverImage || 'https://picsum.photos/seed/defaultcover/1200/400')} 
            className="w-full h-full object-cover transition-all duration-300" 
            alt="Cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          {isEditing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all p-4">
              <div className="flex items-center gap-2 text-white mb-2 font-bold">
                <Camera className="w-5 h-5" /> Change Cover URL
              </div>
              <input 
                type="text"
                value={editedCover}
                onChange={(e) => setEditedCover(e.target.value)}
                placeholder="https://example.com/cover.jpg"
                className="w-full max-w-md bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
              />
            </div>
          )}
        </div>

        {/* Profile Details Section */}
        <div className="px-8 pb-8 relative">
          {/* Avatar - overlapping cover */}
          <div className="absolute -top-16 left-8 z-20">
            <div className="p-1.5 bg-white rounded-[2rem] shadow-xl relative group">
              <img 
                src={isEditing ? editedAvatar : user.avatar} 
                className={`w-32 h-32 rounded-[1.5rem] object-cover transition-all duration-300 ${isEditing ? 'opacity-50' : ''}`} 
                alt={user.name} 
              />
              
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-blue-500/80 p-2 rounded-full text-white shadow-lg">
                    <Edit3 className="w-5 h-5" />
                  </div>
                </div>
              )}
              
              {user.isOnline && !isEditing && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 min-h-[60px]">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 blue-gradient text-white rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5 transition-all"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </>
            ) : (
              <>
                {isOwnProfile && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2.5 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                  >
                    <Edit3 className="w-5 h-5" />
                    Edit Profile
                  </button>
                )}
                <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
                {!isOwnProfile && (
                  <button className="flex items-center gap-2 px-6 py-2.5 blue-gradient text-white rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5 transition-all">
                    <UserPlus className="w-5 h-5" />
                    Follow
                  </button>
                )}
              </>
            )}
          </div>

          {/* User Identity */}
          <div className="mt-8">
            <h2 className="text-3xl font-montserrat text-slate-900 leading-tight">{user.name}</h2>
            <p className="text-slate-400 font-semibold mb-4">{user.username}</p>
            
            {isEditing ? (
              <div className="max-w-2xl mb-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Avatar URL</label>
                  <input 
                    type="text"
                    value={editedAvatar}
                    onChange={(e) => setEditedAvatar(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-slate-700 focus:border-blue-400 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Bio</label>
                  <textarea 
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-slate-700 focus:border-blue-400 outline-none transition-all resize-none h-32"
                    placeholder="Tell the world about yourself..."
                  />
                </div>
              </div>
            ) : (
              <p className="text-slate-700 text-lg leading-relaxed max-w-2xl mb-6">
                {user.bio}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-500 font-semibold text-sm mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{user.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Joined {user.joinedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" />
                <span className="text-blue-500 cursor-pointer hover:underline truncate max-w-[200px] sm:max-w-none">allo.me/{user.username.replace('@', '')}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 border-t border-slate-50 pt-8">
              <div className="text-center">
                <p className="text-xl font-montserrat text-slate-900">{user.postsCount}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-montserrat text-slate-900">{(user.followersCount / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-montserrat text-slate-900">{user.followingCount}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="max-w-2xl mx-auto lg:mx-0">
        <h3 className="text-xl font-montserrat text-slate-800 mb-6 px-4">Latest from {user.name.split(' ')[0]}</h3>
        <div className="space-y-6">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onUserClick={onUserClick}
              />
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-semibold">No recent posts from this global citizen yet.</p>
              <p className="text-slate-400 text-sm mt-2 font-medium">Follow them to stay updated on their journey!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
