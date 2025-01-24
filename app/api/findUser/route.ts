import { currentProfile } from '@/entities/user';
import { NextResponse } from 'next/server';
import { db } from '@/shared/lib/utils';

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const userEmail = searchParams.get('userEmail');

    if (!userEmail) {
      return new NextResponse('User email missing', { status: 404 });
    }

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const otherUser = await db.profile.findFirst({
      where: { email: userEmail },
    });

    if (!otherUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json({ id: otherUser.id });
  } catch (error) {
    console.log('[FIND_USER_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
