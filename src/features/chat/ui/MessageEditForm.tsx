'use client';

import React, { useEffect, useRef } from 'react';
import { z } from 'zod';
import axios from 'axios';
import qs from 'query-string';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageWithProfile } from '@types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from '@/shared/shadcn-ui';
import { EmojiPicker } from '@/shared/ui/emoji-picker';
import { cn, getTime } from '@/shared/lib/utils';
import { useMessagesStore } from '../store/MessagesStore';

const formSchema = z.object({
  content: z.string().min(1),
});

interface MessageEditFormProps {
  message: MessageWithProfile;
  isEditing: boolean;
  isDeleted: boolean;
  setEditing: (isEditing: boolean) => void;
  setIsEdited: (isEdited: boolean) => void;
  serverId?: string;
  otherProfileId?: string;
}

const MessageEditForm: React.FC<MessageEditFormProps> = ({
  message,
  isEditing,
  isDeleted,
  setEditing,
  setIsEdited,
  serverId,
  otherProfileId,
}) => {
  const { updateMessage } = useMessagesStore();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: message.content ?? '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const trimmedContent = data.content && data.content.trim();
    setEditing(false);
    setIsEdited(true);
    //instantly update message content and set isEdited to true for better user experience
    updateMessage(
      trimmedContent,
      message.id,
      getTime(new Date()),
      isDeleted,
      message.fileUrls
    );
    try {
      let url;

      if ('channelId' in message && serverId) {
        url = qs.stringifyUrl({
          url: `/api/channels/${message.channelId}/messages`,
          query: { serverId },
        });
      } else if (otherProfileId) {
        url = `/api/conversations/${otherProfileId}/messages`;
      }

      if (!url) {
        console.error('Invalid url configuration!', url);
        return;
      }

      const objToSend = {
        content: trimmedContent,
        messageId: message.id,
      };

      await axios.patch(url, objToSend);
    } catch (error) {
      //If there was some problem in updating message, rollback changes and display error
      updateMessage(
        message.content,
        message.id,
        message.updatedAt,
        isDeleted,
        message.fileUrls
      );
      setIsEdited(false);
      toast.error(`Failed to edit message: ${error}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditing(false);
        form.reset({ content: message.content ?? '' });
      }
    };

    if (isEditing) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing, form, setEditing, message.content]);

  useEffect(() => {
    if (textareaRef.current && isEditing) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  if (!isEditing || isDeleted) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center w-full gap-2 pt-2"
        onKeyDown={handleKeyDown}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full">
                  <Textarea
                    {...field}
                    ref={textareaRef}
                    className={cn(
                      'pt-3.5 bg-foreground/10 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground resize-none scrollbar-custom border-none',
                      'h-[3rem] max-h-[32.25rem] overflow-y-auto'
                    )}
                    style={{ lineHeight: '1.3rem' }}
                    autoComplete="off"
                    onInput={(event) => {
                      const textarea = event.target as HTMLTextAreaElement;
                      textarea.style.height = '48px';
                      textarea.style.height = `${Math.min(
                        textarea.scrollHeight,
                        32.25 * 16
                      )}px`;
                    }}
                  />
                  <div className="absolute top-3 right-4">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
      <div className="text-[12px] mt-1 text-foreground/50">
        escape to{' '}
        <button
          className="text-primary hover:underline"
          onClick={() => {
            setEditing(false);
            form.reset({ content: message.content ?? '' });
          }}
        >
          cancel
        </button>{' '}
        • enter to{' '}
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => form.handleSubmit(onSubmit)()}
        >
          save
        </button>
      </div>
    </Form>
  );
};

export default MessageEditForm;
