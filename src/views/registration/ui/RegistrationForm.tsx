'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  RegistrationFormSchema,
  RegistrationFormType,
  RegistrationFormPayloadType,
} from '../model/registrationFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { register } from '@app/(authentication)/register/actions';
import { Form } from '@/shared/shadcn-ui';
import { InputField } from '@/shared/ui/input-field';
import { SubmitButton } from '@/shared/ui/submit-button';

const RegistrationForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const registrationForm = useForm<RegistrationFormType>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      email: '',
      options: {
        data: {
          username: '',
        },
      },
      password: '',
      passwordRepeat: '',
    },
  });

  async function onSubmit(data: RegistrationFormType) {
    const objToSend: RegistrationFormPayloadType = {
      email: data.email,
      options: {
        data: {
          username: data.options.data.username,
        },
      },
      password: data.password,
    };
    toast.error((await register(objToSend)).message);
  }

  return (
    <Form {...registrationForm}>
      <form
        onSubmit={registrationForm.handleSubmit(onSubmit)}
        className="flex flex-col min-w-[25vw]"
      >
        <div className="flex flex-col gap-5 mb-10">
          <InputField
            control={registrationForm.control}
            name="email"
            label="Email"
          />
          <InputField
            control={registrationForm.control}
            name="options.data.username"
            label="Username"
          />
          <InputField
            control={registrationForm.control}
            name="password"
            label="Password"
            isPassword={{
              passwordVisibilityToggle: true,
              isPasswordVisible: passwordVisible,
              onToggleVisibility: togglePasswordVisibility,
            }}
          />
          <InputField
            control={registrationForm.control}
            name="passwordRepeat"
            label="Repeat password"
            isPassword={{
              isPasswordVisible: passwordVisible,
              onToggleVisibility: togglePasswordVisibility,
            }}
          />
        </div>
        <SubmitButton>Register</SubmitButton>
      </form>
    </Form>
  );
};

export default RegistrationForm;
