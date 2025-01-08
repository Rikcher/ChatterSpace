import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

interface AuthPromptProps {
  page: 'login' | 'signup';
  className?: string;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ page, className }) => {
  return (
    <p className={cn('text-lg font-semibold tracking-tight', className)}>
      {page === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
      <Button variant="link" asChild className="text-lg p-0">
        <Link href={page === 'login' ? '/registration' : '/login'}>
          {page === 'login' ? 'Register' : 'Log In'}
        </Link>
      </Button>
    </p>
  );
};

export default AuthPrompt;
