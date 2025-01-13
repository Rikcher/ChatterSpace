import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { currentProfile } from '@/entities/user';
import { db } from '@/shared/lib/utils';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    const serverId = (await params).serverId;

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!serverId) {
      return new NextResponse('Server Id Missing', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
