import React from 'react';
import UserAvatar from './UserAvatar';
import LogoutButton from './LogoutButton';
import EditProfileButton from './EditProfileButton';

interface ControlContentProps {
  imageUrl: string;
  fallbackName: string;
}

const ControlContent: React.FC<ControlContentProps> = ({
  imageUrl,
  fallbackName,
}) => {
  return (
    <div className="relative bg-background-shade w-full h-full rounded-md">
      <div className="h-[6.625rem] bg-primary w-full rounded-t-md"></div>
      <div className="px-8 pt-[3.25rem] pb-5">
        <UserAvatar
          src={imageUrl}
          fallbackName={fallbackName}
          className="absolute w-[82px] h-[82px] md:w-[82px] md:h-[82px] box-content border-solid border-[8px] border-background-shade -translate-y-[105px] -translate-x-[8px]"
        />
        <p className="text-xl font-semibold">{fallbackName}</p>
        <div className="flex flex-col mt-4 gap-2">
          <EditProfileButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ControlContent;
