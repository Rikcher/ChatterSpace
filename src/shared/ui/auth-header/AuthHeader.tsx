import React from 'react';
import { AuthPrompt } from '@/shared/ui/auth-promt';
import Image from 'next/image';

interface AuthHeaderProps {
  page: 'register' | 'login';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ page }) => {
  return (
    <div className="relative w-full mb-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{`${page.charAt(0).toUpperCase() + page.slice(1)}`}</h2>
        <AuthPrompt page={page === 'login' ? 'register' : 'login'} />
      </div>
      <Image
        src={`/auth/pepeD.gif`}
        alt="pepeD"
        width={112}
        height={112}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:flex"
      />
    </div>
  );
};

export default AuthHeader;
