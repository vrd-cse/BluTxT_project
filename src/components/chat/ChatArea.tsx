import React, { useState, useEffect, useRef } from 'react';
import { Menu, Phone, Video, Info } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { useUser } from '../../contexts/UserContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatAreaProps {
  contactId: string;
  onOpenDrawer: () => void;
  onViewProfile: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ 
  contactId, 
  onOpenDrawer,
  onViewProfile
}) => {
  const { getMessages, sendMessage, markAsRead } = useChat();
  const { contacts } = useUser();
  const [messages, setMessages] = useState(getMessages(contactId));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contact = contacts.find(c => c.id === contactId);

  // Update messages when contactId changes
  useEffect(() => {
    setMessages(getMessages(contactId));
    markAsRead(contactId);
  }, [contactId, getMessages, markAsRead]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    sendMessage(contactId, content);
    setMessages(getMessages(contactId));
  };

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <ChatHeader 
        name={contact.name}
        avatar={contact.avatar}
        isOnline={contact.isOnline}
        lastSeen={contact.lastSeen}
        onOpenDrawer={onOpenDrawer}
        onViewProfile={onViewProfile}
      />

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <MessageList messages={messages} contactAvatar={contact.avatar} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;