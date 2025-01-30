'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/shadcn-ui';
import CreateDmModalForm from './CreateDmModalForm';
import { useModal } from '@/shared/lib/hooks';

const CreateDmModal: React.FC = ({}) => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'createDm';
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Create Dm</DialogTitle>
          <DialogDescription className="hidden">
            Input user's email to dm them
          </DialogDescription>
        </DialogHeader>
        <CreateDmModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDmModal;
