'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/shadcn-ui';
import EditChannelModalForm from './EditChannelModalForm';
import { useModal } from '@/shared/lib/hooks';

const EditChannelModal: React.FC = ({}) => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'editChannel';
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Edit Channel</DialogTitle>
          <DialogDescription className="hidden">
            Create new channel fro your server
          </DialogDescription>
        </DialogHeader>
        <EditChannelModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
