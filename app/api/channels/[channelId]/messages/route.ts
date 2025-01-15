import { currentProfile } from '@/entities/user';
import { NextResponse } from 'next/server';
import { db } from '@/shared/lib/utils';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { content } = await req.json();

    const serverId = searchParams.get('serverId');
    const channelId = (await params).channelId;

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 });
    }

    if (!channelId) {
      return new NextResponse('Channel ID missing', { status: 400 });
    }

    if (!content) {
      return new NextResponse('Content missing', { status: 400 });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return new NextResponse('Server not found', { status: 404 });
    }

    const channel = await db.channel.findFirst({
      where: { id: channelId, serverId: serverId },
    });

    if (!channel) {
      return new NextResponse('Channel not found', { status: 404 });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return new NextResponse('Member not found', { status: 404 });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl: '',
        channelId: channelId,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log('[CHANNELS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
