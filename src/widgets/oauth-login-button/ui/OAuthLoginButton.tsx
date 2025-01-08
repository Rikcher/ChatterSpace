'use client';

import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { toast } from 'sonner';
import { login, oAuthSignIn } from '@app/(authentication)/login/actions';

interface SubmitButtonProps {
  provider: 'discord' | 'google';
  className?: string;
}

const OAuthLoginButton: React.FC<SubmitButtonProps> = ({
  provider,
  className,
}) => {
  async function onClick() {
    const response = await oAuthSignIn(provider);
    if (response?.message) {
      toast.error(response.message);
    }
  }

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        'text-lg py-5 bg-transparent hover:bg-border/20',
        className
      )}
    >
      <Image
        src={`/${provider}.svg`}
        alt={`${provider} logo`}
        width={24}
        height={24}
      />
      {`Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </Button>
  );
};

export default OAuthLoginButton;
