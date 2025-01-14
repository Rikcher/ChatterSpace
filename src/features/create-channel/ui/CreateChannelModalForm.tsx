'use client';

import React, { useEffect } from 'react';
import {
  createChannelModalFormSchema,
  createChannelModalFormType,
} from '../model/createChannelModalFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import qs from 'query-string';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  FormLabel,
} from '@/shared/shadcn-ui';
import { InputField } from '@/shared/ui/input-field';
import { SubmitButton } from '@/shared/ui/submit-button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/shared/lib/hooks';
import { ChannelType } from '@prisma/client';

const CreateChannelModalForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { onClose, data } = useModal();
  const { channelType } = data;

  const createChannelModalForm = useForm<createChannelModalFormType>({
    resolver: zodResolver(createChannelModalFormSchema),
    defaultValues: {
      name: '',
      type: channelType || ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channelType) {
      createChannelModalForm.setValue('type', channelType);
    } else {
      createChannelModalForm.setValue('type', ChannelType.TEXT);
    }
  }, [channelType, createChannelModalForm]);

  const onSubmit = async (data: createChannelModalFormType) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels`,
        query: {
          serverId: params?.serverId,
        },
      });

      await axios.post(url, data);

      createChannelModalForm.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...createChannelModalForm}>
      <form
        onSubmit={createChannelModalForm.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <InputField
          control={createChannelModalForm.control}
          name="name"
          label="Channel name"
          placeholder="Enter channel name"
          className="mb-5"
        />
        <FormField
          control={createChannelModalForm.control}
          name="type"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel>Channel Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize max-w-[8rem]">
                    <SelectValue placeholder="Select a channel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ChannelType).map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="ml-auto px-6">Create server</SubmitButton>
      </form>
    </Form>
  );
};
export default CreateChannelModalForm;
