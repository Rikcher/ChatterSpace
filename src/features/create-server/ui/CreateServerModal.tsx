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

interface CreateServerProps {}

const CreateServerModal: React.FC<CreateServerProps> = ({}) => {
  return (
    <Dialog open>
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
