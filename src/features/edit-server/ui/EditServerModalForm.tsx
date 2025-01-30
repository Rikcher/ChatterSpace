'use client';

import React, { useEffect } from 'react';
import {
  editServerModalFormSchema,
  editServerModalFormType,
  editServerPayloadType,
} from '../model/editServerModalFormSchema';
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
import { changeImage } from '@/shared/lib/utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/shared/lib/hooks';
import { toast } from 'sonner';

const EditServerModalForm: React.FC = () => {
  const router = useRouter();
  const { onClose, data } = useModal();

  const { server } = data;

  const createServerModalForm = useForm<editServerModalFormType>({
    resolver: zodResolver(editServerModalFormSchema),
    defaultValues: {
      name: '',
      image: null,
    },
  });

  useEffect(() => {
    if (server) {
      createServerModalForm.setValue('name', server.name);
      createServerModalForm.setValue('image', server.imageUrl);
    }
  }, [server, createServerModalForm]);

  const onSubmit = async (data: editServerModalFormType) => {
    const { dirtyFields } = createServerModalForm.formState;

    let newImageUrl = server!.imageUrl;

    if (dirtyFields.image && data.image) {
      const imageName = server?.imageUrl.replace(
        'https://hfyahiqwhtkmontdplnz.supabase.co/storage/v1/object/public/images/servers/',
        ''
      );

      const { publicUrl, error } = await changeImage({
        bucketName: 'images',
        filePath: 'servers',
        image: data.image,
        oldFilePath: `servers/${imageName}`,
      });

      if (error) {
        toast.error(`Image change error: ${error}`);
        return;
      }

      if (publicUrl) {
        newImageUrl = publicUrl;
      }
    }

    const payload: editServerPayloadType = {
      name: data.name,
      imageUrl: newImageUrl,
    };

    try {
      await axios.patch(`/api/servers/${server?.id}`, payload);

      createServerModalForm.reset();
      router.refresh();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data || 'Something went wrong'}`);
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
        <SubmitButton className="ml-auto px-6">Save</SubmitButton>
      </form>
    </Form>
  );
};
export default EditServerModalForm;
