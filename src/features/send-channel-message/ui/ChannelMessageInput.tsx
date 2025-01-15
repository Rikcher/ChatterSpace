'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/shared/shadcn-ui';
import { SubmitButton } from '@/shared/ui/submit-button';
import qs from 'query-string';
import axios from 'axios';
import { Plus, Smile } from 'lucide-react';

interface ChannelMessageInputProps {
  channelId: string;
  channelName: string;
  serverId: string;
}

const ChannelMessageInput: React.FC<ChannelMessageInputProps> = ({
  channelId,
  channelName,
  serverId,
}) => {
  const channelMessageForm = useForm({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: { content: string }) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channelId}/messages`,
        query: {
          serverId: serverId,
        },
      });

      channelMessageForm.reset();
      //todo make fake message while message is posting
      await axios.post(url, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...channelMessageForm}>
      <form
        onSubmit={channelMessageForm.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <FormField
          control={channelMessageForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <Button className="absolute top-7 left-8 h-[24px] w-[24px] bg-foreground/50 hover:bg-foreground/80 rounded-full p-1">
                    <Plus className="text-card-shade-2" />
                  </Button>
                  <Input
                    className="px-14 py-6 bg-foreground/10 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
                    placeholder={`Message #${channelName}`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChannelMessageInput;
