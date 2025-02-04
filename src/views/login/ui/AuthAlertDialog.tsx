'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  Button,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/shared/shadcn-ui';
import { useSearchParams } from 'next/navigation';

const AuthAlertDialog: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const searchParams = useSearchParams();

  const [dialogContent, setDialogContent] = useState({
    title: '',
    description: '',
  });
  useEffect(() => {
    if (searchParams?.get('confirmRegistration') === 'true') {
      setDialogContent({
        title: 'Check Your Email',
        description:
          "We've sent you a confirmation email. Please check your inbox and click the verification link to complete your registration.",
      });
      setShowDialog(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (searchParams?.get('resetPassword') === 'true') {
      setDialogContent({
        title: 'Check Your Email',
        description:
          "We've sent you a password reset email. Please check your inbox and click the link to reset your password. If you don't see the email, make sure to check your spam or junk folder.",
      });
      setShowDialog(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (searchParams?.get('failedLoginProvider') === 'true') {
      setDialogContent({
        title: 'Failed to login',
        description: 'Could not login with provider',
      });
      setShowDialog(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (searchParams?.get('otpError') === 'true') {
      setDialogContent({
        title: 'Failed to login',
        description: 'Could not verify OTP',
      });
      setShowDialog(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent
        className="border border-solid border-border"
        data-test="auth-dialog"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogContent.description}
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

export default AuthAlertDialog;
