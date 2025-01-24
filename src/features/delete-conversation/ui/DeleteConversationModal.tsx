import React, { useState } from 'react';
import { useModal } from '@/shared/lib/hooks';
import { useRouter } from 'next/navigation';
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
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const DeleteConversationModal: React.FC = ({}) => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteConversation';
  const { profileId } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = `/api/conversations/${profileId}`;

      await axios.delete(url);

      onClose();
      router.push('/conversations');
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        onClose();
        toast.error(`Failed to delete conversation: ${error.response?.data}`);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Delete Conversation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this conversation?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
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

export default DeleteConversationModal;
