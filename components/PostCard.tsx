
import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Smile } from 'lucide-react';
import { Post, User } from '../types';

interface PostCardProps {
  post: Post;
  onUserClick?: (user: User) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUserClick }) => {
  return (
    <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Post Header */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="relative cursor-pointer group"
            onClick={() => onUserClick?.(post.author)}
          >
            <img 
              src={post.author.avatar} 
              className="w-12 h-12 rounded-2xl object-cover transform group-hover:scale-105 transition-transform" 
              alt={post.author.name} 
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div 
            className="cursor-pointer group"
            onClick={() => onUserClick?.(post.author)}
          >
            <h4 className="font-bold text-slate-800 leading-tight group-hover:text-blue-500 transition-colors">
              {post.author.name}
            </h4>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-slate-400 font-semibold">{post.author.username}</p>
              <span className="text-slate-300 text-[10px]">•</span>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">{post.author.country}</p>
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-3">
        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Media */}
      {post.image && (
        <div className="px-2">
          <img src={post.image} className="w-full h-auto max-h-[500px] object-cover rounded-2xl" alt="Post content" />
        </div>
      )}

      {/* Interactions Summary */}
      <div className="p-5 flex items-center justify-between border-b border-slate-50">
        <div className="flex -space-x-2">
          {post.reactions.map((emoji, i) => (
            <div key={i} className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs shadow-sm border border-slate-100 z-[3-i]">
              {emoji}
            </div>
          ))}
          <span className="pl-3 text-xs text-slate-400 font-semibold">{post.likes.toLocaleString()} people reacted</span>
        </div>
        <div className="flex gap-4 text-xs text-slate-400 font-semibold">
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 py-3 flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all group">
          <Heart className="w-5 h-5 group-hover:fill-current" />
          <span className="font-bold text-sm">Like</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-500 transition-all">
          <MessageCircle className="w-5 h-5" />
          <span className="font-bold text-sm">Comment</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
          <Share2 className="w-5 h-5" />
          <span className="font-bold text-sm">Share</span>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
          <Smile className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
};

export default PostCard;
