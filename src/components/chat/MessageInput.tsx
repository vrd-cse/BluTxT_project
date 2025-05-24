import React, { useState, useRef, useEffect } from 'react';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-surface">
      <div className="flex items-end space-x-2">
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Paperclip className="w-5 h-5 text-text/70" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Smile className="w-5 h-5 text-text/70" />
          </button>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full rounded-2xl px-4 py-3 max-h-32 resize-none border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-gray-50 dark:bg-gray-800"
            rows={1}
          />
        </div>
        
        <div>
          {message ? (
            <button 
              onClick={handleSendMessage}
              className="p-3 rounded-full bg-primary text-white hover:bg-primary/90 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Mic className="w-5 h-5 text-text/70" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInput;