'use client';

import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';

interface GoBackButtonProps {
  className?: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ className }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Button
      className={cn('bg-transparent hover:bg-border/20', className)}
      variant="outline"
      onClick={handleGoBack}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
