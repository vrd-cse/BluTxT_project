import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { Contact } from '../../contexts/UserContext';
import { formatTime } from '../../utils/dateUtils';

interface ContactListProps {
  contacts: Contact[];
  activeContactId: string | null;
  onContactSelect: (contactId: string) => void;
  hasUnreadMessages: (contactId: string) => boolean;
}

const ContactList: React.FC<ContactListProps> = ({ 
  contacts, 
  activeContactId, 
  onContactSelect,
  hasUnreadMessages
}) => {
  const { getMessages } = useChat();

  const getLastMessage = (contactId: string) => {
    const messages = getMessages(contactId);
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      {contacts.map(contact => {
        const lastMessage = getLastMessage(contact.id);
        const hasUnread = hasUnreadMessages(contact.id);
        
        return (
          <div 
            key={contact.id} 
            className={`
              p-4 flex items-center cursor-pointer hover:bg-primary-light transition
              ${activeContactId === contact.id ? 'bg-primary-light' : ''}
            `}
            onClick={() => onContactSelect(contact.id)}
          >
            <div className="relative">
              <img 
                src={contact.avatar} 
                alt={contact.name} 
                className="w-12 h-12 rounded-full mr-3" 
              />
              {contact.isOnline && (
                <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{contact.name}</h3>
                <span className="text-xs text-text/60">
                  {lastMessage ? formatTime(new Date(lastMessage.timestamp)) : (contact.lastSeen || '')}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-1">
                <p className={`text-sm truncate ${hasUnread ? 'font-medium' : 'text-text/60'}`}>
                  {lastMessage?.content || 'Start a conversation'}
                </p>
                
                {hasUnread && (
                  <span className="ml-2 flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                    {getMessages(contact.id).filter(m => !m.isRead && m.receiverId !== contact.id).length}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;