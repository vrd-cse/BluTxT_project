import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Message } from '../../contexts/ChatContext';
import { formatTime } from '../../utils/dateUtils';

interface MessageListProps {
  messages: Message[];
  contactAvatar: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, contactAvatar }) => {
  const { user } = useAuth();
  
  const userAvatar = user?.avatar || 'https://i.pravatar.cc/150?img=1';

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-text/60 p-8">
        <div className="mb-4 text-7xl">👋</div>
        <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
        <p>Send a message to begin chatting</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        const isUser = message.senderId === user?.id;
        const avatar = isUser ? userAvatar : contactAvatar;
        const isFirstInGroup = index === 0 || messages[index - 1].senderId !== message.senderId;
        const isLastInGroup = index === messages.length - 1 || messages[index + 1].senderId !== message.senderId;

        return (
          <div 
            key={message.id} 
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-appear`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              {isLastInGroup && (
                <div className="flex-shrink-0 h-8 w-8 mt-1">
                  {isLastInGroup && (
                    <img src={avatar} alt="Avatar" className="rounded-full h-8 w-8" />
                  )}
                </div>
              )}
              <div className={`mx-2 ${isUser ? 'mr-0' : 'ml-0'}`}>
                <div 
                  className={`px-4 py-2 rounded-2xl ${
                    isUser 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-200 dark:bg-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
                <div 
                  className={`text-xs mt-1 text-text/60 ${
                    isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {formatTime(new Date(message.timestamp))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;