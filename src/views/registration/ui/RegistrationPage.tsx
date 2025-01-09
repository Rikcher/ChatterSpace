import React from 'react';
import { AuthHeader } from '@/shared/ui/auth-header';
import Image from 'next/image';
import RegistrationForm from './RegistrationForm';

const RegistrationPage = () => {
  return (
    <div className="flex flex-col">
      <AuthHeader page="register" />
      <RegistrationForm />
    </div>
  );
};
export default RegistrationPage;
