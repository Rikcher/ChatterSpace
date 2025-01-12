'use client';

import React from 'react';
import {
  createServerModalFormSchema,
  createServerModalFormType,
  createNewServerPayload,
  createServerPayloadType,
} from '../model/createServerModalFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/shadcn-ui';
import { InputField } from '@/shared/ui/input-field';
import { SubmitButton } from '@/shared/ui/submit-button';
import { SingleImageDropzone } from '@/shared/ui/single-image-dropzone';
import { uploadImage } from '@/shared/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateServerModalForm: React.FC = () => {
  const router = useRouter();

  const createServerModalForm = useForm<createServerModalFormType>({
    resolver: zodResolver(createServerModalFormSchema),
    defaultValues: {
      name: '',
      image: null,
    },
  });

  const onSubmit = async (data: createServerModalFormType) => {
    if (data.image) {
      const { publicUrl, error } = await uploadImage({
        bucketName: 'images',
        filePath: 'servers',
        image: data.image,
      });

      if (error) {
        console.error('Upload error:', error);
        return;
      }

      if (publicUrl) {
        const payload: createServerPayloadType = {
          name: data.name,
          imageUrl: publicUrl,
        };

        try {
          console.log(await axios.post('/api/servers', payload));

          createServerModalForm.reset();
          router.refresh();
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <Form {...createServerModalForm}>
      <form
        onSubmit={createServerModalForm.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <InputField
          control={createServerModalForm.control}
          name="name"
          label="Server name"
          className="mb-8"
        />
        <FormField
          control={createServerModalForm.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormControl>
                <SingleImageDropzone
                  value={field.value}
                  dropzoneOptions={{ maxSize: 2097152 }} //2Mb in bytes
                  onChange={(file) => {
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="ml-auto px-6">Create server</SubmitButton>
      </form>
    </Form>
  );
};
export default CreateServerModalForm;
