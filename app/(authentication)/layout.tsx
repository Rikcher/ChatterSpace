'use server';

import React from 'react';
import { Separator } from '@/shared/shadcn-ui';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="bg-card rounded-xl px-8 py-10 shadow-[0_0_60px_0_hsl(var(--primary-muted))]">
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
    </div>
  );
};
export default AuthLayout;
