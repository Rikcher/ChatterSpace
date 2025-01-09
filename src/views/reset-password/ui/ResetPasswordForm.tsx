'use client';

import React from 'react';
import { InputField } from '@/shared/ui/input-field';
import { SubmitButton } from '@/shared/ui/submit-button';
import { Form } from '@/shared/shadcn-ui';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordFormSchema,
  ResetPasswordFormSchemaType,
} from '@/views/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { sendResetPasswordLink } from '@app/(authentication)/reset-password/actions';

const ResetPasswordForm = () => {
  const resetPasswordForm = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: ResetPasswordFormSchemaType) {
    toast.error((await sendResetPasswordLink(data)).message);
  }

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <InputField
          control={resetPasswordForm.control}
          name="email"
          label="Email"
        />
        <SubmitButton disabledWhileNotValid>Send Reset Link</SubmitButton>
      </form>
    </Form>
  );
};
export default ResetPasswordForm;
