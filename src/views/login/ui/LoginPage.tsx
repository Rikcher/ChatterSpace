'use server';

import React from 'react';
import LoginForm from './LoginForm';
import { AuthPrompt } from '@/shared/ui/auth-promt';
import { Separator } from '@/shared/shadcn-ui';
import { OAuthLoginButton } from '@/widgets/oauth-login-button';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Login</h2>
          <AuthPrompt page="login" className="mb-5" />
        </div>
        <Image src={`/auth/pepeD.gif`} alt="pepeD" width={112} height={112} />
      </div>
      <LoginForm />
      <div className="text-border flex items-center justify-center gap-2 w-full overflow-hidden my-2">
        <Separator />
        or
        <Separator />
      </div>
      <div className="flex flex-col gap-5">
        <OAuthLoginButton provider="discord" />
        <OAuthLoginButton provider="google" />
      </div>
    </div>
  );
};

export default LoginPage;
