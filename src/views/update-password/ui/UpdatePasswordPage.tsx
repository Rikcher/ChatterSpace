'use client';

import React, { useEffect, useState } from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import { useSearchParams } from 'next/navigation';
import { exchangeCodeForSession } from '@app/(authentication)/update-password/actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/shared/shadcn-ui';

const UpdatePasswordPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  useEffect(() => {
    if (error && errorDescription) {
      toast.error(`Error: ${errorDescription}`);
    } else if (code) {
      const fetchSession = async () => {
        const response = await exchangeCodeForSession(code);
        if (response?.message) {
          toast.error(response.message);
        }
      };
      fetchSession();
    }
  }, [code, error, errorDescription]);

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
      <Button className="bg-transparent w-full mt-5" variant="outline" asChild>
        <Link href="/login">Back to login page</Link>
      </Button>
    </div>
  );
};

export default UpdatePasswordPage;
