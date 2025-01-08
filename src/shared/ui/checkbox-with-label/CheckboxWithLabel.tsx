import React from "react";
import { Checkbox, Label } from "@/shared/shadcn-ui";

interface CheckboxWithLabelProps {
  id: string;
  children?: React.ReactNode;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  id,
  children,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox id={id} />
      <Label htmlFor={id}>{children}</Label>
    </div>
  );
};

export default CheckboxWithLabel;
