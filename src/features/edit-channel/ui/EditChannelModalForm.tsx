'use client';

import React, { useEffect } from 'react';
import {
  editChannelModalFormSchema,
  editChannelModalFormType,
} from '../model/editChannelModalFormSchema';
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
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/shared/lib/hooks';
import { ChannelType } from '@prisma/client';
import { toast } from 'sonner';

const EditChannelModalForm: React.FC = () => {
  const router = useRouter();
  const { onClose, data } = useModal();
  const { channel, server } = data;

  const editChannelModalForm = useForm<editChannelModalFormType>({
    resolver: zodResolver(editChannelModalFormSchema),
    defaultValues: {
      name: '',
      type: channel?.type || ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channel) {
      editChannelModalForm.setValue('name', channel.name);
      editChannelModalForm.setValue('type', channel.type);
    }
  }, [editChannelModalForm, channel]);

  const onSubmit = async (data: editChannelModalFormType) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.patch(url, data);

      editChannelModalForm.reset();
      router.refresh();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data || 'Something went wrong'}`);
      }
    }
  };

  return (
    <Form {...editChannelModalForm}>
      <form
        onSubmit={editChannelModalForm.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <InputField
          control={editChannelModalForm.control}
          name="name"
          label="Channel name"
          placeholder="Enter channel name"
          className="mb-5"
        />
        <FormField
          control={editChannelModalForm.control}
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
        <SubmitButton className="ml-auto px-6">Save</SubmitButton>
      </form>
    </Form>
  );
};
export default EditChannelModalForm;
