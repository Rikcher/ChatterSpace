import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { exchangeCodeForSession } from '@app/(authentication)/update-password/actions';
import { revalidatePath } from 'next/cache';

const useExchangeCodeForSession = async () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  useEffect(() => {
    if (error && errorDescription) {
      toast.error(`Error: ${errorDescription}`);
    } else if (code) {
      const fetchSession = async () => {
        const response = await exchangeCodeForSession(code);
        if (response?.message) {
          toast.error(response.message);
        }
      };
      fetchSession();
    }
  }, [code, error, errorDescription]);
};

export default useExchangeCodeForSession;
