import { currentProfile } from '@/entities/user';
import { NextResponse } from 'next/server';
import { db } from '@/shared/lib/utils';

export async function PATCH(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedProfile = await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        username: name,
        imageUrl,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log('[PROFILE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
