'use client';

import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { signOut } from '@app/auth/actions';

const LogoutButton = () => {
  return <Button onClick={signOut}>Logout</Button>;
};
export default LogoutButton;
