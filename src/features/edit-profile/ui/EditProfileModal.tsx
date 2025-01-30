'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/shadcn-ui';
import EditProfileModalForm from './EditProfileModalForm';
import { useModal } from '@/shared/lib/hooks';

const EditProfileModal: React.FC = ({}) => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'editProfile';
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="hidden">
            Edit your profile
          </DialogDescription>
        </DialogHeader>
        <EditProfileModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
