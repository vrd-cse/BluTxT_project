import React, { useState, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';
import Sidebar from '../components/sidebar/Sidebar';
import ChatArea from '../components/chat/ChatArea';
import EmptyState from '../components/ui/EmptyState';
import UserProfile from '../components/profile/UserProfile';
import ContactProfile from '../components/profile/ContactProfile';

type View = 'chat' | 'userProfile' | 'contactProfile';

const MainLayout: React.FC = () => {
  const { activeConversation, setActiveConversation } = useChat();
  const { contacts } = useUser();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('chat');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  useEffect(() => {
    // Set the active conversation from URL or default to first contact
    if (!activeConversation && contacts.length > 0) {
      setActiveConversation(contacts[0].id);
    }
  }, [contacts, activeConversation, setActiveConversation]);

  const handleContactSelect = (contactId: string) => {
    setActiveConversation(contactId);
    setIsMobileDrawerOpen(false);
  };

  const handleViewUserProfile = () => {
    setCurrentView('userProfile');
  };

  const handleViewContactProfile = (contactId: string) => {
    setSelectedContact(contactId);
    setCurrentView('contactProfile');
  };

  const handleBackToChat = () => {
    setCurrentView('chat');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-surface">
      {/* Mobile drawer backdrop */}
      {isMobileDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileDrawerOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 w-80 z-30 transform transition-transform duration-300 ease-in-out bg-surface md:relative md:translate-x-0 ${
            isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }
        `}
      >
        <Sidebar 
          onContactSelect={handleContactSelect} 
          activeContactId={activeConversation}
          onViewProfile={handleViewUserProfile}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeConversation ? (
          <>
            {currentView === 'chat' && (
              <ChatArea 
                contactId={activeConversation} 
                onOpenDrawer={() => setIsMobileDrawerOpen(true)}
                onViewProfile={() => handleViewContactProfile(activeConversation)}
              />
            )}
            {currentView === 'userProfile' && (
              <UserProfile onBack={handleBackToChat} />
            )}
            {currentView === 'contactProfile' && selectedContact && (
              <ContactProfile contactId={selectedContact} onBack={handleBackToChat} />
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default MainLayout;