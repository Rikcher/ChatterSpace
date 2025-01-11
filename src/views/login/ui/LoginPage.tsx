import React, { Suspense } from 'react';
import LoginForm from './LoginForm';
import { AuthHeader } from '@/shared/ui/auth-header';
import { Separator } from '@/shared/shadcn-ui';
import { OAuthLoginButton } from '@/widgets/oauth-login-button';
import AuthAlertDialog from './AuthAlertDialog';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <AuthHeader page="login" />
      <LoginForm />
      <div className="text-border flex items-center justify-center gap-2 w-full overflow-hidden my-2">
        <Separator />
        or
        <Separator />
      </div>
      <div className="flex flex-col gap-5">
        <OAuthLoginButton provider="discord" />
        <OAuthLoginButton provider="google" />
      </div>
      <Suspense>
        <AuthAlertDialog />
      </Suspense>
    </div>
  );
};

export default LoginPage;
