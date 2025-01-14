'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/shadcn-ui';
import CreateServerModalForm from './CreateServerModalForm';
import { useModal } from '@/shared/lib/hooks';

const CreateServerModal: React.FC = ({}) => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'createServer';
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Customize your server</DialogTitle>
          <DialogDescription>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <CreateServerModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
