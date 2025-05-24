import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface UserContextType {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
}

const UserContext = createContext<UserContextType>({
  contacts: [],
  addContact: () => {},
  removeContact: () => {},
});

export const useUser = () => useContext(UserContext);

// Mock contacts data
const mockContacts: Contact[] = [
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    avatar: 'https://i.pravatar.cc/150?img=5', 
    isOnline: true 
  },
  { 
    id: '3', 
    name: 'Michael Chen', 
    avatar: 'https://i.pravatar.cc/150?img=8', 
    isOnline: false,
    lastSeen: '10:30 AM'
  },
  { 
    id: '4', 
    name: 'Aisha Patel', 
    avatar: 'https://i.pravatar.cc/150?img=9', 
    isOnline: true 
  },
  { 
    id: '5', 
    name: 'Carlos Rodriguez', 
    avatar: 'https://i.pravatar.cc/150?img=11', 
    isOnline: false,
    lastSeen: 'Yesterday'
  },
  { 
    id: '6', 
    name: 'INIT Assistant', 
    avatar: 'https://i.pravatar.cc/150?img=13', 
    isOnline: true 
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Load from localStorage or use mock data
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      setContacts(mockContacts);
      localStorage.setItem('contacts', JSON.stringify(mockContacts));
    }
  }, []);

  const addContact = (contact: Contact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const removeContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <UserContext.Provider value={{ 
      contacts, 
      addContact, 
      removeContact 
    }}>
      {children}
    </UserContext.Provider>
  );
};