import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';

interface UserAvatarProps {
  src: string;
  fallbackName: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  fallbackName,
  className,
}) => {
  const fallback = fallbackName
    .replace(/[^a-zA-Z]/g, '')
    .substring(0, 1)
    .toUpperCase();
  console.log(fallbackName, fallback);
  return (
    <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
