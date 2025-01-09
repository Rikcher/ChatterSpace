import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { Button } from '@/shared/shadcn-ui';
import Link from 'next/link';

const ResetPasswordPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tigh mb-3">
        Reset Your Password
      </h2>
      <p className="max-w-[30rem] mb-5">
        Forgot your password? No problem! Enter your email address below, and
        we'll send you a link to reset it. Check your inbox for instructions on
        how to set a new password.
      </p>
      <ResetPasswordForm />
      <Button className="bg-transparent w-full mt-5" variant="outline" asChild>
        <Link href="/login">Back to login page</Link>
      </Button>
    </div>
  );
};
export default ResetPasswordPage;
