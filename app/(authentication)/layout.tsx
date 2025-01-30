'use server';

import React from 'react';
import { Blob } from '@/shared/ui/blob';
import Image from 'next/image';
import { ThemeToggle } from '@/shared/ui/theme-toggle';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <Blob
        size={1400}
        duration={4000}
        className="fixed right-[-300px] bottom-[-800px] z-[-1]"
      />
      <div className="bg-card-shade rounded-xl px-14 py-16 min-w-[38rem]">
        {children}
      </div>
      <div className="absolute top-5 left-5 flex gap-3 items-center text-xl font-semibold tracking-wider">
        <Image
          src={`/logo.svg`}
          alt="ChatterSpace logo"
          width={32}
          height={32}
        />
        ChatterSpace
      </div>
      <div className="absolute top-5 right-5">
        <ThemeToggle
          side="bottom"
          align="end"
          className="hover:bg-transparent dark:hover:bg-transparent"
        />
      </div>
    </div>
  );
};
export default AuthLayout;
