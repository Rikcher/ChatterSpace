import { redirect } from 'next/navigation';

import { createClient } from '@/shared/lib/utils';
import { Button } from '@/shared/shadcn-ui';
import { signOut } from '@app/actions';

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error: userError } = await supabase.auth.getUser();

  if (userError || !data?.user) {
    redirect('/login');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id);

  if (profileError) {
    console.error('Error fetching profile:', profileError.message);
  } else {
    console.log('User profile:', { ...profile });
  }

  return (
    <form>
      <p>Hello {data.user.email}</p>
      <p>Username {profile![0].username}</p>
      <img src={profile![0].avatar_url} alt="" />
      <Button formAction={signOut}>sign out</Button>
    </form>
  );
}
