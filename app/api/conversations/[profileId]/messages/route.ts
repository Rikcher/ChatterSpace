import { currentProfile } from '@/entities/user';
import { NextResponse } from 'next/server';
import { createClient, db } from '@/shared/lib/utils';
import { DirectMessage } from '@prisma/client';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const profile = await currentProfile();
    const profileId = (await params).profileId;
    const { content, files, messageId } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!content && (!files || files.length === 0)) {
      return new NextResponse('Message body is missing', { status: 400 });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { profileOneId: profileId, profileTwoId: profile.id },
          { profileOneId: profile.id, profileTwoId: profileId },
        ],
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    const directMessage = await db.directMessage.create({
      data: {
        id: messageId,
        content,
        fileUrls: files || [],
        profileId: profile.id,
        conversationId: conversation.id,
      },
    });

    return NextResponse.json(directMessage);
  } catch (error) {
    console.log('[MESSAGE_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { content, messageId } = await req.json();
    const profileId = (await params).profileId;

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!content) {
      return new NextResponse('Content missing', { status: 400 });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { profileOneId: profileId, profileTwoId: profile.id },
          { profileOneId: profile.id, profileTwoId: profileId },
        ],
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    const directMessage = await db.directMessage.update({
      where: { id: messageId, conversationId: conversation.id },
      data: {
        content,
      },
    });

    return NextResponse.json(directMessage);
  } catch (error) {
    console.log('[MESSAGE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get('cursor');
    const paramLimit = searchParams.get('limit');

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const profileId = (await params).profileId;

    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { profileOneId: profileId, profileTwoId: profile.id },
          { profileOneId: profile.id, profileTwoId: profileId },
        ],
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    if (!paramLimit) {
      return new NextResponse('Limit is undefined', { status: 400 });
    }

    const limit = parseInt(paramLimit, 10);

    const supabase = await createClient();

    let query = supabase
      .from('DirectMessage')
      .select(
        'content, fileUrls, createdAt, id, createdAt, updatedAt, deleted, profileId, conversationId'
      )
      .eq('conversationId', conversation.id)
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

    const profiles = {
      [conversation.profileOne.id]: {
        username: conversation.profileOne.username,
        imageUrl: conversation.profileOne.imageUrl,
      },
      [conversation.profileTwo.id]: {
        username: conversation.profileTwo.username,
        imageUrl: conversation.profileTwo.imageUrl,
      },
    };

    const messagesWithProfile = data.map((message: DirectMessage) => {
      const profile = profiles[message.profileId] || {
        username: 'Unknown',
        imageUrl: '',
      };

      return {
        ...message,
        profile: {
          username: profile.username,
          imageUrl: profile.imageUrl,
        },
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
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const profile = await currentProfile();
    const profileId = (await params).profileId;
    const { searchParams } = new URL(req.url);

    const messageId = searchParams.get('messageId');
    const fileUrl = searchParams.get('fileUrl');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!messageId) {
      return new NextResponse('Message ID missing', { status: 400 });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { profileOneId: profileId, profileTwoId: profile.id },
          { profileOneId: profile.id, profileTwoId: profileId },
        ],
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    let message;

    if (!fileUrl) {
      const response = await db.directMessage.update({
        where: { id: messageId, conversationId: conversation.id },
        data: {
          deleted: true,
        },
      });
      if (profile.id === response.profileId) {
        message = response;
      }
    } else {
      const messageToUpdate = await db.directMessage.findUnique({
        where: { id: messageId, conversationId: conversation.id },
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
      message = await db.directMessage.update({
        where: { id: messageId, conversationId: conversation.id },
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
