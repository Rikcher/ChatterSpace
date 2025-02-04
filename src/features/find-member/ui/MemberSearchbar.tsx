import React from 'react';
import { Search } from 'lucide-react';

interface MemberSearchbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const MemberSearchbar: React.FC<MemberSearchbarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div>
      <p className="text-md text-foreground/80 mb-2">
        Enter users username or email
      </p>
      <div className="relative">
        <input
          className="w-full rounded-md border border-input bg-card-foreground/70 pl-3 py-2 pr-[3.5rem]"
          placeholder="Example@gmail.com"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-5" />
      </div>
    </div>
  );
};

export default MemberSearchbar;
