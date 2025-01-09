import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/shared/shadcn-ui';

interface PasswordVisibilityToggleProps {
  isVisible: boolean | undefined;
  onToggle: (() => void) | undefined;
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({
  isVisible,
  onToggle,
}) => {
  return (
    <Button
      type="button"
      onClick={onToggle}
      className="absolute text-ring inset-y-0 right-0 px-3 [&_svg]:size-6 flex items-center select-none cursor-pointer bg-transparent shadow-none hover:bg-transparent"
    >
      {isVisible ? <Eye /> : <EyeOff />}
    </Button>
  );
};

export default PasswordVisibilityToggle;
