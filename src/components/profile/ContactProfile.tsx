import React from 'react';
import { ChevronLeft, Phone, Video, Blocks as Block, Bell, Trash2 } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface ContactProfileProps {
  contactId: string;
  onBack: () => void;
}

const ContactProfile: React.FC<ContactProfileProps> = ({ contactId, onBack }) => {
  const { contacts } = useUser();
  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return <div>Contact not found</div>;
  }

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
        <h2 className="font-medium">Contact Info</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Avatar section */}
        <div className="bg-primary h-48 flex justify-center items-center relative">
          <div className="absolute inset-0 flex justify-center items-center">
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900" 
            />
          </div>
        </div>

        {/* Info section */}
        <div className="p-6 bg-surface rounded-t-3xl -mt-6 shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-bold mb-1">{contact.name}</h1>
            <p className="text-text/60">
              {contact.isOnline ? 'Online' : `Last seen ${contact.lastSeen || 'recently'}`}
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex justify-center space-x-6 mb-8">
            <button className="flex flex-col items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-1">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm">Call</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-1">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm">Video</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-1">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm">Mute</span>
            </button>
          </div>

          {/* About section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text/60 mb-2">About</h3>
            <p>{contactId === '6' ? 'I\'m INIT, your helpful AI assistant!' : 'Hey there! I\'m using BlueTexT.'}</p>
          </div>

          {/* Media, files section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text/60 mb-2">Media, Links and Documents</h3>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-text/60">No media shared yet</p>
            </div>
          </div>

          {/* Actions */}
          {contactId !== '6' && (
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Block className="w-5 h-5 text-red-500 mr-3" />
                <span>Block {contact.name}</span>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Trash2 className="w-5 h-5 text-red-500 mr-3" />
                <span>Delete chat</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactProfile;