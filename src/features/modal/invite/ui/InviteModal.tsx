'use client';

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@/shared/shadcn-ui';
import { useModal } from '../../lib/useModalStore';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/shared/lib/hooks';
import axios from 'axios';

interface CreateServerProps {}

const InviteModal: React.FC<CreateServerProps> = ({}) => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen('invite', { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Invite Friends</DialogTitle>
        </DialogHeader>
        <Label className="uppercase text-xs font-bold">
          Server Invite Link
        </Label>
        <div className="flex items-center gap-2">
          <Input disabled={isLoading} readOnly value={inviteUrl} />
          <Button disabled={isLoading} onClick={onCopy} size="icon">
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
        <Button
          onClick={onNew}
          disabled={isLoading}
          variant="link"
          size="sm"
          className="mr-auto"
        >
          Generate a new link
          <RefreshCw className="h-4 w-4 ml-2" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
