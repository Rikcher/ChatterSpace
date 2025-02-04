'use client';

import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { toast } from 'sonner';
import { oAuthSignIn } from '@app/(authentication)/login/actions';

interface OAuthLoginButtonProps {
  provider: 'discord' | 'google';
  className?: string;
}

const OAuthLoginButton: React.FC<OAuthLoginButtonProps> = ({
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
      data-oauth={provider}
      onClick={onClick}
      variant="outline"
      className={cn(
        'text-lg py-5 bg-transparent border-border hover:bg-border/20 dark:hover:bg-border/20',
        className
      )}
    >
      <Image
        src={`/${provider}.svg`}
        alt={`${provider} logo`}
        width={24}
        height={24}
        className="invert dark:invert-0"
      />
      {`Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </Button>
  );
};

export default OAuthLoginButton;
