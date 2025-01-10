'use client';

import { formatFileSize } from '@/shared/lib/utils';
import { UploadCloudIcon, X } from 'lucide-react';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/shared/shadcn-ui';
import Image from 'next/image';

const variants = {
  base: 'relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[12.5rem] min-w-full border border-dashed border-border transition-colors duration-200 ease-in-out',
  image:
    'border-0 p-0 min-h-[12.5rem] min-w-0 relative shadow-md bg-background/40 rounded-md',
  active: 'border-2',
  disabled:
    'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-destructive bg-destructive/10',
};

type InputProps = {
  width?: number;
  height?: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
  invalidDimensions(minWidth: number, minHeight: number) {
    return `The image must be at least ${minWidth}x${minHeight} pixels.`;
  },
  invalidDimensionsMax(maxWidth: number, maxHeight: number) {
    return `The image must not exceed ${maxWidth}x${maxHeight} pixels.`;
  },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      dropzoneOptions,
      width = 150,
      height = 150,
      value,
      className,
      disabled,
      onChange,
      minWidth = 48,
      minHeight = 48,
      maxWidth = 512,
      maxHeight = 512,
    },
    ref
  ) => {
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
      undefined
    );
    const imageUrl = React.useMemo(() => {
      if (typeof value === 'string') {
        return value;
      } else if (value) {
        return URL.createObjectURL(value);
      }
      return null;
    }, [value]);

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          // Check image dimensions before calling onChange
          const img = new window.Image();
          const reader = new FileReader();

          reader.onload = () => {
            img.src = reader.result as string;
            img.onload = () => {
              const { width: imgWidth, height: imgHeight } = img;
              let error = '';

              // Validate the image dimensions if min/max dimensions are set
              if (minWidth && imgWidth < minWidth) {
                error = ERROR_MESSAGES.invalidDimensions(minWidth, minHeight);
              } else if (minHeight && imgHeight < minHeight) {
                error = ERROR_MESSAGES.invalidDimensions(minWidth, minHeight);
              } else if (maxWidth && imgWidth > maxWidth) {
                error = ERROR_MESSAGES.invalidDimensionsMax(
                  maxWidth,
                  maxHeight
                );
              } else if (maxHeight && imgHeight > maxHeight) {
                error = ERROR_MESSAGES.invalidDimensionsMax(
                  maxWidth,
                  maxHeight
                );
              }

              if (error) {
                // Set the error message if dimensions don't match
                setErrorMessage(error);
                return; // Skip the onChange if invalid
              }

              setErrorMessage(undefined); // Clear error if valid
              void onChange?.(file); // Call onChange only if dimensions are valid
            };
          };

          reader.readAsDataURL(file); // Trigger loading of the image
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          ((isDragReject ?? fileRejections[0]) || errorMessage) &&
            variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        errorMessage,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    // error validation messages (file related)
    const fileErrorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
          })}
        >
          <input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            <Image
              className="rounded-full object-cover aspect-square"
              src={imageUrl}
              alt={acceptedFiles[0]?.name}
              width={width}
              height={height}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
              <UploadCloudIcon size={28} />
              <div className="text-gray-400">drag & drop to upload</div>
              <div className="my-2">or</div>
              <Button
                variant="outline-ghost"
                type="button"
                disabled={disabled}
                className="px-8"
                onClick={() => setErrorMessage(undefined)}
              >
                select
              </Button>
            </div>
          )}

          {imageUrl && !disabled && (
            <div
              className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
              onClick={(e) => {
                e.stopPropagation();
                void onChange?.(undefined);
              }}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                <X
                  className="text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          )}
        </div>

        {/* Display Error Messages */}
        <div className="mt-1 text-xs text-destructive">
          {errorMessage || fileErrorMessage}
        </div>
      </div>
    );
  }
);

SingleImageDropzone.displayName = 'SingleImageDropzone';

export { SingleImageDropzone };
