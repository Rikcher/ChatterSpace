'use client';

import React from 'react';
import {
  createDmModalFormSchema,
  createDmModalFormType,
} from '../model/createDmModalFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/shadcn-ui';
import { InputField } from '@/shared/ui/input-field';
import { SubmitButton } from '@/shared/ui/submit-button';
import { useRouter } from 'next/navigation';
import { useModal } from '@/shared/lib/hooks';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import qs from 'query-string';
import { Profile } from '@prisma/client';

const CreateDmModalForm: React.FC = () => {
  const router = useRouter();
  const { onClose } = useModal();

  const createDmModalForm = useForm<createDmModalFormType>({
    resolver: zodResolver(createDmModalFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: createDmModalFormType) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/findUser',
        query: {
          userEmail: data.email,
        },
      });

      const response = await axios.get(url);
      const { id } = response.data;

      router.push(`/conversations/${id}`);
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(`${error.response?.data || 'Something went wrong'}`);
      }
    }
  };

  return (
    <Form {...createDmModalForm}>
      <form
        onSubmit={createDmModalForm.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <InputField
          control={createDmModalForm.control}
          name="email"
          label="Other user email"
          placeholder="Enter other user email"
          className="mb-5"
        />

        <SubmitButton className="ml-auto px-6">Create dm</SubmitButton>
      </form>
    </Form>
  );
};
export default CreateDmModalForm;
