'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
  Button,
} from '@/shared/shadcn-ui';
import { useSearchParams } from 'next/navigation';

const CheckEmailDialog: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get('checkEmail') === 'true') {
      setShowDialog(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="border border-solid border-border">
        <AlertDialogHeader>
          <AlertDialogTitle>Check Your Email</AlertDialogTitle>
          <AlertDialogDescription>
            We've sent you a confirmation email. Please check your inbox and
            click the verification link to complete your registration.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={() => setShowDialog(false)}>Got it</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckEmailDialog;
