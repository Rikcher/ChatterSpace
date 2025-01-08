import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/shadcn-ui";
import { cn } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabledWhileNotValid?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  className,
  disabledWhileNotValid = false,
}) => {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const isDisabled = isSubmitting || (disabledWhileNotValid && !isValid);

  return (
    <Button
      disabled={isDisabled}
      type="submit"
      className={cn(
        `text-lg py-5 ${isSubmitting && "bg-loading text-loading-foreground"}`,
        className,
      )}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" />
          Please wait
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
