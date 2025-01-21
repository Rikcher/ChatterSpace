import { currentProfile } from '@/entities/user';
import { NextResponse } from 'next/server';
import { createClient, db } from '@/shared/lib/utils';
import { MemberRole, Message } from '@prisma/client';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { content, files, messageId } = await req.json();

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

    if (!content && (!files || files.length === 0)) {
      return new NextResponse('Message body is missing', { status: 400 });
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
        id: messageId,
        content,
        channelId: channelId,
        memberId: member.id,
        fileUrls: files || [],
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
    console.log('[MESSAGE_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { content, messageId } = await req.json();

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
      return new NextResponse('Channel not found', {
        status: 404,
      });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return new NextResponse('Member not found', { status: 404 });
    }

    const message = await db.message.update({
      where: { id: messageId, channelId: channelId, memberId: member.id },
      data: {
        content,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log('[MESSAGE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 });
    }

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const channelId = (await params).channelId;

    if (!channelId) {
      return new NextResponse('Channel ID missing', { status: 400 });
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
        members: {
          include: {
            profile: true,
          },
        },
        channels: true,
      },
    });

    if (!server) {
      return new NextResponse('Server not found', { status: 404 });
    }

    const channel = server.channels.find((c) => c.id === channelId);

    if (!channel) {
      return new NextResponse('Channel not found', { status: 404 });
    }

    const member = server.members.find((m) => m.profileId === profile.id);

    if (!member) {
      return new NextResponse('Member not found', { status: 404 });
    }

    const cursor = searchParams.get('cursor');
    const paramLimit = searchParams.get('limit');

    if (!paramLimit) {
      return new NextResponse('Limit is undefined', { status: 400 });
    }

    const limit = parseInt(paramLimit, 10);

    const supabase = await createClient();

    let query = supabase
      .from('Message')
      .select(
        'content, fileUrls, memberId, createdAt, id, channelId, createdAt, updatedAt, deleted'
      )
      .eq('channelId', channelId)
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt('createdAt', cursor);
    }

    const { data, error } = await query;

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    const nextCursor =
      data.length === limit ? data[data.length - 1].createdAt : null;

    const messagesWithProfile = data.map((message: Message) => {
      const member = server.members.find((m) => m.id === message.memberId);
      const profile = member?.profile || { username: 'Unknown', imageUrl: '' };

      return {
        ...message,
        profile: { username: profile.username, imageUrl: profile.imageUrl },
        role: member?.role,
      };
    });

    return NextResponse.json({ data: messagesWithProfile, nextCursor });
  } catch (error) {
    console.log('[MESSAGE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');
    const messageId = searchParams.get('messageId');
    const fileUrl = searchParams.get('fileUrl');
    const channelId = (await params).channelId;

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 });
    }

    if (!messageId) {
      return new NextResponse('Message ID missing', { status: 400 });
    }

    if (!channelId) {
      return new NextResponse('Channel ID missing', { status: 400 });
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
      return new NextResponse('Channel not found', {
        status: 404,
      });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return new NextResponse('Member not found', { status: 404 });
    }

    let message;

    if (!fileUrl) {
      const response = await db.message.update({
        where: { id: messageId, channelId: channelId },
        data: {
          deleted: true,
        },
      });
      if (
        member.role === MemberRole.ADMIN ||
        member.role === MemberRole.MODERATOR ||
        member.id === response.memberId
      ) {
        message = response;
      }
    } else {
      const messageToUpdate = await db.message.findUnique({
        where: { id: messageId, channelId: channelId, memberId: member.id },
        select: {
          fileUrls: true,
        },
      });

      if (!messageToUpdate) {
        return new NextResponse('File not found', { status: 404 });
      }

      const updatedFileUrls = messageToUpdate.fileUrls.filter(
        (url) => url !== fileUrl
      );
      message = await db.message.update({
        where: { id: messageId, channelId: channelId, memberId: member.id },
        data: {
          fileUrls: updatedFileUrls,
        },
      });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.log('[MESSAGE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
