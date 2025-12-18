
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage?: string;
  bio?: string;
  country: string;
  isOnline: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  joinedDate: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  reactions: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: User;
  content: string;
  time: string;
  isRead: boolean;
}

export interface Community {
  id: string;
  name: string;
  members: number;
  image: string;
  category: string;
}
