import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <MessageSquare className="w-16 h-16 text-primary/50 mb-4" />
      <h2 className="text-xl font-bold mb-2">Welcome to BlueTexT</h2>
      <p className="text-text/60 max-w-md mb-4">
        Select a contact from the sidebar to start chatting, or try asking INIT 
        for help with any questions you might have.
      </p>
      <div className="flex items-center justify-center p-4 bg-primary/5 rounded-lg">
        <div className="mr-4">
          <img 
            src="https://i.pravatar.cc/150?img=13" 
            alt="INIT" 
            className="w-12 h-12 rounded-full" 
          />
        </div>
        <div className="text-left">
          <h3 className="font-medium">INIT Assistant</h3>
          <p className="text-sm text-text/60">Always online and ready to help!</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;