'use client';

import React from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import { GoBackButton } from '@/shared/ui/go-back-button';
import useExchangeCodeForSession from '../lib/useExchangeCodeForSession';

const UpdatePasswordPage = () => {
  useExchangeCodeForSession();

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tigh mb-3">
        Update Your Password
      </h2>
      <p className="max-w-[30rem] mb-5">
        To keep your account secure, please choose a new password. Enter your
        new password below, and make sure it's something unique and strong. Once
        updated, you'll be able to log in with your new password right away.
      </p>
      <UpdatePasswordForm />
      <GoBackButton toLogin className="w-full mt-5" />
    </div>
  );
};

export default UpdatePasswordPage;
