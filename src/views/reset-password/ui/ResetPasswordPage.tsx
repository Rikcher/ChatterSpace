import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { GoBackButton } from '@/shared/ui/go-back-button';

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
      <GoBackButton className="w-full mt-5" />
    </div>
  );
};
export default ResetPasswordPage;
