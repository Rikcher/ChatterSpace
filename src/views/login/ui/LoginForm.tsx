'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, LoginFormSchema } from '../model/loginFormSchema';
import { Button, Form } from '@/shared/shadcn-ui';
import { CheckboxWithLabel } from '@/shared/ui/checkbox-with-label';
import { SubmitButton } from '@/shared/ui/submit-button';
import { InputField } from '@/shared/ui/input-field';
import Link from 'next/link';
import { login } from '@app/(authentication)/login/actions';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormType) {
    toast.error((await login(data)).message);
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-5">
          <InputField control={loginForm.control} name="email" label="Email" />
          <InputField
            control={loginForm.control}
            name="password"
            label="Password"
            isPassword={{
              passwordVisibilityToggle: true,
              isPasswordVisible: passwordVisible,
              onToggleVisibility: togglePasswordVisibility,
            }}
          />
        </div>
        <div className="flex justify-between items-center mb-8 mt-2">
          <CheckboxWithLabel id="remember-me-checkbox">
            Remember Me
          </CheckboxWithLabel>
          <Button variant="link" className="m-0 px-0" asChild>
            <Link href={'#'}>Forgot password</Link>
          </Button>
        </div>
        <SubmitButton disabledWhileNotValid>Login</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
