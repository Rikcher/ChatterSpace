import { ShieldAlert, ShieldCheck } from 'lucide-react';
import React from 'react';

export const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-400" />,
  ADMIN: <ShieldAlert className="h4- w-4 ml-2 text-rose-500" />,
};
