import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

interface AuthPromptProps {
  page: 'login' | 'register';
  className?: string;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ page, className }) => {
  return (
    <p className={cn('text-lg font-semibold tracking-tight', className)}>
      {page === 'register'
        ? "Don't have an account?"
        : 'Already have an account?'}{' '}
      <Button variant="link" asChild className="text-lg p-0">
        <Link href={page}>
          {`${page.charAt(0).toUpperCase() + page.slice(1)}`}
        </Link>
      </Button>
    </p>
  );
};

export default AuthPrompt;
