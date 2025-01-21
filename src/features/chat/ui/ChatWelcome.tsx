import React from 'react';
import { Hash } from 'lucide-react';

interface ChatWelcomeProps {
  type: 'channel' | 'conversation';
  name: string;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ type, name }) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === 'channel' && (
        <div className="h-[75px] w-[75px] rounded-full flex items-center justify-center bg-foreground/10">
          <Hash className="w-12 h-12 text-foreground/70" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === 'channel' ? 'Welcome to #' : ''}
        {name}
      </p>
      <p className="text-sm text-foreground/50">
        {type === 'channel'
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}.`}
      </p>
    </div>
  );
};

export default ChatWelcome;
