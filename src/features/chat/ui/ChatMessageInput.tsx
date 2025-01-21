'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { MemberRole, Profile } from '@prisma/client';
import { MessageWithProfile } from '@types';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from '@/shared/shadcn-ui';
import { Plus } from 'lucide-react';
import { cn, getTime, uploadImage } from '@/shared/lib/utils';
import AttachmentPreview from './AttachmentPreview';
import { EmojiPicker } from '@/shared/ui/emoji-picker';
import { useMessagesStore } from '../store/MessagesStore';

interface ChannelMessageInputProps {
  channelId?: string;
  memberId?: string;
  name: string;
  serverId?: string;
  profile: Profile;
  role?: MemberRole;
  conversationId?: string;
  otherProfileId?: string;
}

const ChatMessageInput: React.FC<ChannelMessageInputProps> = ({
  channelId,
  name,
  memberId,
  serverId,
  profile,
  role,
  conversationId,
  otherProfileId,
}) => {
  const {
    addMessage,
    addToPendingMessages,
    deleteMessage,
    removeFromPendingMessages,
    removeFile,
    getProperUrls,
  } = useMessagesStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [previewImages, setPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);
  const [files, setFiles] = useState<File[]>();

  const form = useForm<{ content: string }>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: { content: string }) => {
    form.reset();
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
    const trimmedContent = data.content.trim();
    const messageId = uuidv4();
    const now = new Date();
    if (files || trimmedContent) {
      //make placeholder message to instantly show user for better user experience
      let placeholderMessage: MessageWithProfile | undefined;
      if (channelId && memberId && role) {
        placeholderMessage = {
          id: messageId,
          content: trimmedContent,
          fileUrls: previewImages.map((image) => image.url),
          memberId: memberId,
          channelId: channelId,
          deleted: false,
          createdAt: getTime(now),
          updatedAt: getTime(now),
          profile: {
            imageUrl: profile.imageUrl,
            username: profile.username,
          },
          role: role,
          pending: true,
        };
      } else if (conversationId) {
        placeholderMessage = {
          id: messageId,
          content: trimmedContent,
          fileUrls: previewImages.map((image) => image.url),
          profileId: profile.id,
          conversationId: conversationId,
          deleted: false,
          createdAt: getTime(now),
          updatedAt: getTime(now),
          profile: {
            imageUrl: profile.imageUrl,
            username: profile.username,
          },
          pending: true,
        };
      }

      if (!placeholderMessage) {
        console.error('Invalid message configuration!');
        return;
      }

      addMessage(placeholderMessage);
      addToPendingMessages(placeholderMessage.id);
      try {
        let urls: string[] = [];
        if (files) {
          const pendingFiles = files;
          setFiles([]);
          setPreviewImages([]);
          const uploadPromises = pendingFiles.map(async (file, index) => {
            const { publicUrl, error } = await uploadImage({
              bucketName: 'images',
              filePath: 'attachments',
              image: file,
            });

            if (error) {
              const failedUrl = previewImages[index]?.url;
              if (failedUrl) {
                removeFile(placeholderMessage.id, failedUrl);
              }
              toast.error(`File upload failed: ${error}`);
              return null;
            }

            return publicUrl;
          });

          const results = await Promise.all(uploadPromises);
          urls = results.filter((url): url is string => url !== null);
        }

        //user local preview file in placeholder message and change urls to proper ones as soon as they are uploaded for deleting to work correctly
        getProperUrls(messageId, urls);

        const objToSend = {
          content: trimmedContent,
          files: urls,
          messageId: messageId,
        };

        let url;

        if (channelId && memberId && role) {
          url = qs.stringifyUrl({
            url: `/api/channels/${channelId}/messages`,
            query: { serverId },
          });
        } else if (conversationId) {
          url = `/api/conversations/${otherProfileId}/messages`;
        }

        if (!url) {
          console.error('Invalid url configuration!');
          return;
        }

        await axios.post(url, objToSend);
        removeFromPendingMessages(placeholderMessage.id);
      } catch (error) {
        deleteMessage(messageId);
        toast.error('Failed to send message!');
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setFiles(fileList);
      const filePreviews = Array.from(files).map((file) => {
        return { url: URL.createObjectURL(file), name: file.name };
      });
      setPreviewImages((prev) => [...prev, ...filePreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      document.activeElement !== fileInputRef.current &&
      !event.shiftKey
    ) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      {!!previewImages.length && (
        <div className="flex flex-wrap mx-4 gap-6 bg-foreground/10 px-4 py-6 rounded-t-md">
          {previewImages.map((item, idx) => (
            <AttachmentPreview
              index={idx}
              item={item}
              onRemove={handleRemoveImage}
              key={idx}
            />
          ))}
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
          onKeyDown={handleKeyDown}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative px-4 pb-6">
                    <Button
                      type="button"
                      className="absolute translate-y-1/2 left-8 h-[24px] w-[24px] bg-foreground/50 hover:bg-foreground/80 rounded-full p-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Plus className="text-card-shade-2" />
                    </Button>
                    <Textarea
                      className={cn(
                        'px-14 pt-3.5 bg-foreground/10 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground resize-none overflow-auto scrollbar-custom',
                        'h-[3rem] max-h-[32.25rem] overflow-y-auto',
                        !!previewImages.length &&
                          'rounded-t-none border-t border-solid border-foreground/10'
                      )}
                      style={{
                        lineHeight: '1.3rem',
                      }}
                      placeholder={`Message ${channelId ? '#' : ''}${name}`}
                      autoComplete="off"
                      onInput={(event) => {
                        const textarea = event.target as HTMLTextAreaElement;
                        textarea.style.height = '48px';
                        textarea.style.height = `${Math.min(
                          textarea.scrollHeight,
                          32.25 * 16
                        )}px`;
                      }}
                      {...field}
                      ref={textareaRef}
                    />

                    <div className="absolute top-3 right-8">
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

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChatMessageInput;
