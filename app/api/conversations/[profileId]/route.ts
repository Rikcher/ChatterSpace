import { currentProfile } from '@/entities/user';
import { NextResponse } from 'next/server';
import { db } from '@/shared/lib/utils';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const profile = await currentProfile();
    const profileId = (await params).profileId;

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { profileOneId: profileId, profileTwoId: profile.id },
          { profileOneId: profile.id, profileTwoId: profileId },
        ],
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    const isPinned = conversation.pinned.includes(profile.id);

    const updatedPinned = isPinned
      ? conversation.pinned.filter((id) => id !== profile.id)
      : [...conversation.pinned, profile.id];

    const changedConversation = await db.conversation.update({
      where: {
        id: conversation.id,
        OR: [
          { profileOneId: profileId, profileTwoId: profile.id },
          { profileOneId: profile.id, profileTwoId: profileId },
        ],
      },
      data: {
        pinned: updatedPinned,
      },
    });

    return NextResponse.json(changedConversation);
  } catch (error) {
    console.log('[CONVERSATION_PATCH]', error);
    return new NextResponse(`Internal Error ${error}`, {
      status: 500,
    });
  }
}
