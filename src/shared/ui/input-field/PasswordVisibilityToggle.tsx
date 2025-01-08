'use client';

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/shared/shadcn-ui';

const PasswordVisibilityToggle: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    const passwordInputs = document.querySelectorAll('input[name^="password"]');

    passwordInputs.forEach((passwordInput) => {
      passwordInput?.setAttribute(
        'type',
        passwordInput?.getAttribute('type') === 'password' ? 'text' : 'password'
      );
    });

    setPasswordVisibility(!passwordVisibility);
  };

  useEffect(() => {
    const passwordInputs = document.querySelectorAll('input[name^="password"]');

    passwordInputs.forEach((passwordInput) => {
      passwordInput?.setAttribute('type', 'password');
    });
  }, []);

  return (
    <Button
      type="button"
      id="passwordVisibility"
      onClick={() => handlePasswordVisibility()}
      className="absolute text-ring inset-y-0 right-0 px-3 [&_svg]:size-6 flex items-center select-none cursor-pointer bg-transparrent shadow-none hover:bg-transparrent"
    >
      {passwordVisibility ? <Eye /> : <EyeOff />}
    </Button>
  );
};

export default PasswordVisibilityToggle;
