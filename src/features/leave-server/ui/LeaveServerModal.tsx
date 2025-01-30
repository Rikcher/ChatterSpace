'use client';

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/shadcn-ui';
import { useModal } from '@/shared/lib/hooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LeaveServerModal: React.FC = ({}) => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === 'leaveServer';
  const { server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Leave Server</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave{' '}
            <span className="font-semibold text-primary">{server?.name}</span>?
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
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
