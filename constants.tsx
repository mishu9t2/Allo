
import { User, Post, Community, Notification } from './types';

export const COLORS = {
  primary: '#1DA1F2',
  secondary: '#FFFFFF',
  accent: '#FF9900',
  text: '#1F2937',
  gray: '#9CA3AF',
  bg: '#F8FAFC'
};

export const MOCK_USERS: User[] = [
  { 
    id: '1', 
    name: 'Amara Okafor', 
    username: '@amara_global', 
    avatar: 'https://picsum.photos/seed/amara/150',
    coverImage: 'https://picsum.photos/seed/lagos/1200/400',
    bio: 'Storyteller and Global Citizen. Capturing the beauty of human connection across continents. ✨',
    country: 'Nigeria', 
    isOnline: true,
    followersCount: 12400,
    followingCount: 890,
    postsCount: 142,
    joinedDate: 'March 2023'
  },
  { 
    id: '2', 
    name: 'Yuki Tanaka', 
    username: '@yuki_t', 
    avatar: 'https://picsum.photos/seed/yuki/150',
    coverImage: 'https://picsum.photos/seed/tokyo/1200/400',
    bio: 'Tokyo based photographer. Exploring the intersection of tradition and technology. 📸🗼',
    country: 'Japan', 
    isOnline: true,
    followersCount: 45000,
    followingCount: 1200,
    postsCount: 856,
    joinedDate: 'January 2022'
  },
  { 
    id: '3', 
    name: 'Lucas Silva', 
    username: '@lucas_dev', 
    avatar: 'https://picsum.photos/seed/lucas/150',
    coverImage: 'https://picsum.photos/seed/rio/1200/400',
    bio: 'Software Engineer by day, Samba dancer by night. Building tools for a more connected world. 💻🕺',
    country: 'Brazil', 
    isOnline: false,
    followersCount: 3200,
    followingCount: 450,
    postsCount: 64,
    joinedDate: 'June 2023'
  },
  { 
    id: '4', 
    name: 'Elena Rossi', 
    username: '@elena_design', 
    avatar: 'https://picsum.photos/seed/elena/150',
    coverImage: 'https://picsum.photos/seed/rome/1200/400',
    bio: 'UX Architect. Designing for empathy and accessibility. Coffee enthusiast. ☕️🎨',
    country: 'Italy', 
    isOnline: true,
    followersCount: 8900,
    followingCount: 670,
    postsCount: 231,
    joinedDate: 'November 2022'
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[0],
    content: 'Just arrived in Kyoto! The global community here is amazing. Anyone up for a coffee? ☕️🌏 #AlloJapan #Travel',
    image: 'https://picsum.photos/seed/kyoto/800/500',
    likes: 1240,
    comments: 89,
    shares: 45,
    timestamp: '2h ago',
    reactions: ['❤️', '🔥', '🙌']
  },
  {
    id: 'p2',
    author: MOCK_USERS[3],
    content: 'Designing the next generation of connecting tools. Diversity is our strength! 🎨🚀 #UXDesign #GlobalConnect',
    likes: 850,
    comments: 34,
    shares: 12,
    timestamp: '5h ago',
    reactions: ['💡', '👍']
  },
  {
    id: 'p3',
    author: MOCK_USERS[1],
    content: 'Sunrise over Mount Fuji this morning. Moments like these remind me why we need to stay connected to nature as much as each other. 🗻🌅',
    image: 'https://picsum.photos/seed/fuji/800/500',
    likes: 3200,
    comments: 156,
    shares: 210,
    timestamp: '8h ago',
    reactions: ['✨', '😮', '💙']
  },
  {
    id: 'p4',
    author: MOCK_USERS[2],
    content: 'Code is universal. Just deployed a new open-source module that helps translate UI strings into 40+ languages. Let\'s build bridges! 🛠️🌍',
    likes: 450,
    comments: 21,
    shares: 5,
    timestamp: '1d ago',
    reactions: ['🚀', '👏']
  }
];

export const MOCK_COMMUNITIES: Community[] = [
  { id: 'c1', name: 'Tech Without Borders', members: 45000, image: 'https://picsum.photos/seed/tech/200', category: 'Technology' },
  { id: 'c2', name: 'Global Foodies', members: 120000, image: 'https://picsum.photos/seed/food/200', category: 'Lifestyle' },
  { id: 'c3', name: 'Digital Nomads', members: 89000, image: 'https://picsum.photos/seed/nomad/200', category: 'Travel' }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'like', user: MOCK_USERS[1], content: 'liked your post', time: '5m ago', isRead: false },
  { id: 'n2', type: 'follow', user: MOCK_USERS[2], content: 'started following you', time: '1h ago', isRead: true },
];
