'use client';

import React, { useState } from 'react';
import { Loader2, LogOut } from 'lucide-react';
import { Button } from '@/shared/shadcn-ui';
import { clientCreateClient } from '@/shared/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const supabase = clientCreateClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      router.push('/');
    } catch {
      toast.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={logout}
      className="justify-start bg-foreground/10 dark:bg-foreground/20 text-foreground dark:text-foreground/90 hover:bg-foreground/20 dark:hover:bg-foreground/30"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      Logout
    </Button>
  );
};
export default LogoutButton;
