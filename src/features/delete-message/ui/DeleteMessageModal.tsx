import React, { useState } from 'react';
import { useModal } from '@/shared/lib/hooks';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import axios, { AxiosError } from 'axios';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/shadcn-ui';
import { useMessages } from '@/features/chat/queries/useMessages';
import { useMessagesStore } from '@/features/chat/store/MessagesStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const DeleteMessageModal: React.FC = ({}) => {
  const { isOpen, onClose, type, data } = useModal();
  const { removeMessage, removeFile } = useMessagesStore();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'deleteMessage';
  const { serverId, channelId, messageId, fileUrl, profileId } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      let url;

      if (serverId && channelId) {
        url = qs.stringifyUrl({
          url: `/api/channels/${channelId}/messages`,
          query: {
            serverId: serverId,
            messageId: messageId,
            fileUrl: fileUrl,
          },
        });
      } else if (profileId) {
        url = qs.stringifyUrl({
          url: `/api/conversations/${profileId}/messages`,
          query: {
            messageId: messageId,
            fileUrl: fileUrl,
          },
        });
      }

      if (!url) {
        console.error('Invalid url configuration!');
        return;
      }

      await axios.delete(url);

      onClose();
      if (messageId) {
        if (fileUrl) {
          removeFile(messageId, fileUrl);
        } else {
          removeMessage(messageId);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        onClose();
        toast.error(`Failed to delete message: ${error.response?.data}`);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Delete Message</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this message?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              data-test="confirm-delete-button"
              disabled={isLoading}
              onClick={onClick}
              variant="destructive"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Please wait
                </div>
              ) : (
                'Confirm'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMessageModal;
