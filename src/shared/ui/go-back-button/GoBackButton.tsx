'use client';

import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface GoBackButtonProps {
  className?: string;
  toLogin?: boolean;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ className, toLogin }) => {
  const handleGoBack = () => {
    if (toLogin) {
      redirect('/login');
    }
    window.history.back();
  };

  return (
    <Button
      className={cn('bg-transparent border-none hover:bg-border/20', className)}
      variant="outline"
      onClick={handleGoBack}
    >
      {`Go Back ${toLogin ? 'To Login' : ''}`}
    </Button>
  );
};

export default GoBackButton;
