import React, { useState } from 'react';
import { Search, UserPlus, Settings, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import { useChat } from '../../contexts/ChatContext';
import ContactList from './ContactList';
import ThemeToggle from '../ui/ThemeToggle';

interface SidebarProps {
  onContactSelect: (contactId: string) => void;
  activeContactId: string | null;
  onViewProfile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onContactSelect, 
  activeContactId,
  onViewProfile
}) => {
  const { user, logout } = useAuth();
  const { contacts } = useUser();
  const { hasUnreadMessages } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="w-7 h-7 text-primary mr-2" />
          <h1 className="text-xl font-bold text-primary">BlueTexT</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* User info */}
      <div 
        className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={onViewProfile}
      >
        <img 
          src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
          alt={user?.name || 'User'} 
          className="w-10 h-10 rounded-full mr-3" 
        />
        <div className="flex-1">
          <h2 className="font-medium">{user?.name || 'User'}</h2>
          <p className="text-sm text-text/60">{user?.email || ''}</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-gray-50 dark:bg-gray-800"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto">
        <ContactList 
          contacts={filteredContacts}
          activeContactId={activeContactId}
          onContactSelect={onContactSelect}
          hasUnreadMessages={hasUnreadMessages}
        />
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between">
        <button 
          className="flex items-center text-sm text-text/70 hover:text-text transition"
          title="Add new contact"
        >
          <UserPlus className="w-5 h-5 mr-1" /> 
          <span>New Contact</span>
        </button>
        <button 
          onClick={logout}
          className="flex items-center text-sm text-text/70 hover:text-red-500 transition"
          title="Log out"
        >
          <LogOut className="w-5 h-5 mr-1" /> 
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;