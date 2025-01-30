'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/shadcn-ui';
import InitialServerModalForm from './InitialServerModalForm';

const InitialServerModal: React.FC = ({}) => {
  return (
    <Dialog open>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Customize your server</DialogTitle>
          <DialogDescription>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <InitialServerModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default InitialServerModal;
