import React, { createContext, useContext, useState, useEffect } from 'react';
import { Contact } from './UserContext';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  contactId: string;
  messages: Message[];
}

interface ChatContextType {
  conversations: Conversation[];
  activeConversation: string | null;
  setActiveConversation: (contactId: string) => void;
  sendMessage: (receiverId: string, content: string, isAI?: boolean) => void;
  getMessages: (contactId: string) => Message[];
  markAsRead: (contactId: string) => void;
  hasUnreadMessages: (contactId: string) => boolean;
}

const ChatContext = createContext<ChatContextType>({
  conversations: [],
  activeConversation: null,
  setActiveConversation: () => {},
  sendMessage: () => {},
  getMessages: () => [],
  markAsRead: () => {},
  hasUnreadMessages: () => false,
});

export const useChat = () => useContext(ChatContext);

// Generate a mock conversation with the AI assistant
const createInitialAIConversation = (userId: string): Conversation => {
  return {
    contactId: '6', // INIT Assistant ID
    messages: [
      {
        id: '1',
        senderId: '6',
        receiverId: userId,
        content: 'Hello! I\'m INIT, your AI assistant. How can I help you today?',
        timestamp: new Date().toISOString(),
        isRead: false,
      }
    ]
  };
};

// Some mock conversations
const createMockConversations = (userId: string): Conversation[] => {
  return [
    {
      contactId: '2',
      messages: [
        {
          id: '1',
          senderId: '2',
          receiverId: userId,
          content: 'Hey, how are you doing?',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isRead: true,
        },
        {
          id: '2',
          senderId: userId,
          receiverId: '2',
          content: 'I\'m good! Just checking out this new messaging app.',
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          isRead: true,
        },
        {
          id: '3',
          senderId: '2',
          receiverId: userId,
          content: 'BlueTexT? Yeah, I\'ve heard it\'s pretty cool. The INIT assistant is really helpful!',
          timestamp: new Date(Date.now() - 3400000).toISOString(),
          isRead: false,
        }
      ]
    },
    createInitialAIConversation(userId)
  ];
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would load conversations from a backend
    const storedConversations = localStorage.getItem('conversations');
    const userId = JSON.parse(localStorage.getItem('user') || '{}')?.id;
    
    if (storedConversations && userId) {
      setConversations(JSON.parse(storedConversations));
    } else if (userId) {
      const mockConversations = createMockConversations(userId);
      setConversations(mockConversations);
      localStorage.setItem('conversations', JSON.stringify(mockConversations));
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const getMessages = (contactId: string): Message[] => {
    const conversation = conversations.find(conv => conv.contactId === contactId);
    return conversation?.messages || [];
  };

  const sendMessage = (receiverId: string, content: string, isAI = false) => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')?.id;
    if (!userId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: isAI ? receiverId : userId,
      receiverId: isAI ? userId : receiverId,
      content,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setConversations(prevConversations => {
      const conversationIndex = prevConversations.findIndex(
        conv => conv.contactId === receiverId
      );

      if (conversationIndex >= 0) {
        // Conversation exists, add message
        const updatedConversations = [...prevConversations];
        updatedConversations[conversationIndex] = {
          ...updatedConversations[conversationIndex],
          messages: [...updatedConversations[conversationIndex].messages, newMessage]
        };
        return updatedConversations;
      } else {
        // Create new conversation
        return [
          ...prevConversations,
          {
            contactId: receiverId,
            messages: [newMessage]
          }
        ];
      }
    });

    // If this is the AI assistant, generate a response
    if (receiverId === '6' && !isAI) {
      setTimeout(() => {
        const aiResponse = generateAIResponse(content);
        sendMessage(receiverId, aiResponse, true);
      }, 1500);
    }
  };

  const generateAIResponse = (question: string): string => {
    // In a real app, this would call an actual AI API
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      return 'Hello! How can I help you today?';
    } else if (lowerQuestion.includes('how are you')) {
      return 'I\'m functioning perfectly! Thanks for asking. How can I assist you?';
    } else if (lowerQuestion.includes('weather')) {
      return 'I can\'t access real-time weather information in this demo, but in the full version, I could provide current weather forecasts for any location.';
    } else if (lowerQuestion.includes('your name')) {
      return 'I\'m INIT, your personal AI assistant in BlueTexT. I\'m here to provide information and assistance!';
    } else if (lowerQuestion.includes('bluetext')) {
      return 'BlueTexT is a modern messaging platform with AI assistance. It allows you to chat with friends and get reliable information through me, INIT.';
    } else {
      return 'That\'s an interesting question. In the full version, I could provide more detailed information about this topic. Is there anything else you\'d like to know?';
    }
  };

  const markAsRead = (contactId: string) => {
    setConversations(prevConversations => {
      const conversationIndex = prevConversations.findIndex(
        conv => conv.contactId === contactId
      );

      if (conversationIndex >= 0) {
        const updatedConversations = [...prevConversations];
        updatedConversations[conversationIndex] = {
          ...updatedConversations[conversationIndex],
          messages: updatedConversations[conversationIndex].messages.map(msg => 
            msg.receiverId === JSON.parse(localStorage.getItem('user') || '{}')?.id
              ? { ...msg, isRead: true }
              : msg
          )
        };
        return updatedConversations;
      }
      return prevConversations;
    });
  };

  const hasUnreadMessages = (contactId: string): boolean => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')?.id;
    const conversation = conversations.find(conv => conv.contactId === contactId);
    
    return conversation?.messages.some(
      msg => msg.receiverId === userId && !msg.isRead
    ) || false;
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      setActiveConversation,
      sendMessage,
      getMessages,
      markAsRead,
      hasUnreadMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
};