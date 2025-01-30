'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/shadcn-ui';
import CreateChannelModalForm from './CreateChannelModalForm';
import { useModal } from '@/shared/lib/hooks';

const CreateChannelModal: React.FC = ({}) => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'createChannel';
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Create Channel</DialogTitle>
          <DialogDescription className="hidden">
            Create new channel fro your server
          </DialogDescription>
        </DialogHeader>
        <CreateChannelModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
