'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdatePasswordFormSchema,
  UpdatePasswordFormSchemaType,
  UpdatePasswordFormPayloadType,
} from '../model/updatePasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/shared/shadcn-ui';
import { InputField } from '@/shared/ui/input-field';
import { SubmitButton } from '@/shared/ui/submit-button';
import { updatePassword } from '@app/(authentication)/update-password/actions';

const UpdatePasswordForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const updatePasswordForm = useForm<UpdatePasswordFormSchemaType>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  });

  async function onSubmit(data: UpdatePasswordFormSchemaType) {
    const objToSend: UpdatePasswordFormPayloadType = {
      password: data.password,
    };
    toast.error((await updatePassword(objToSend)).message);
  }

  return (
    <Form {...updatePasswordForm}>
      <form
        onSubmit={updatePasswordForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <InputField
          control={updatePasswordForm.control}
          name="password"
          label="Password"
          isPassword={{
            passwordVisibilityToggle: true,
            isPasswordVisible: passwordVisible,
            onToggleVisibility: togglePasswordVisibility,
          }}
        />
        <InputField
          control={updatePasswordForm.control}
          name="passwordRepeat"
          label="Repeat password"
          isPassword={{
            isPasswordVisible: passwordVisible,
            onToggleVisibility: togglePasswordVisibility,
          }}
        />
        <SubmitButton>Update password</SubmitButton>
      </form>
    </Form>
  );
};
export default UpdatePasswordForm;
