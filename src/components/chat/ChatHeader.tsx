import React from 'react';
import { Menu, Phone, Video, Info } from 'lucide-react';

interface ChatHeaderProps {
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  onOpenDrawer: () => void;
  onViewProfile: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  name, 
  avatar, 
  isOnline, 
  lastSeen,
  onOpenDrawer,
  onViewProfile
}) => {
  return (
    <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-surface shadow-sm">
      <div className="flex items-center">
        <button 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-2 md:hidden transition"
          onClick={onOpenDrawer}
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center cursor-pointer" onClick={onViewProfile}>
          <div className="relative mr-3">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            )}
          </div>
          
          <div>
            <h2 className="font-medium">{name}</h2>
            <p className="text-xs text-text/60">
              {isOnline ? 'Online' : `Last seen ${lastSeen || 'recently'}`}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Phone className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Video className="w-5 h-5" />
        </button>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={onViewProfile}
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;