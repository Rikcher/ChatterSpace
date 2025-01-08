import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/shadcn-ui";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  passwordVisibilityToggle?: boolean;
  disabled?: boolean;
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  inputClassName,
  passwordVisibilityToggle = false,
  disabled,
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                disabled={disabled}
                className={cn(
                  `${name.startsWith("password") && "pr-12"}`,
                  inputClassName,
                )}
                placeholder={placeholder}
                {...field} // Spread field props (value, onChange, etc.)
              />
            </FormControl>
            {passwordVisibilityToggle && <PasswordVisibilityToggle />}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
