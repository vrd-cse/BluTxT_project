import React, { useState } from 'react';
import { ChevronLeft, Camera, Edit2, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState('Hello! I\'m using BlueTexT.');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // In a real app, save to backend/database
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center bg-surface">
        <button 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-2 transition"
          onClick={onBack}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-medium">Profile</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Avatar section */}
        <div className="bg-primary h-48 flex justify-center items-center relative">
          <div className="absolute inset-0 flex justify-center items-center">
            <img 
              src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
              alt={user?.name || 'User'} 
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900" 
            />
            <button className="absolute bottom-0 right-1/2 translate-x-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
              <Camera className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Info section */}
        <div className="p-6 bg-surface rounded-t-3xl -mt-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-text/60">Your Name</h3>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Edit2 className="w-4 h-4 text-primary" />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition mb-2"
                />
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-text/70 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xl font-bold">{name}</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-text/60 mb-2">Email</h3>
            <p>{user?.email || 'user@example.com'}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-text/60 mb-2">Bio</h3>
            <p>{bio}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-text/60 mb-2">Account ID</h3>
            <p className="text-text/70 text-sm font-mono">{user?.id || 'user-id'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;