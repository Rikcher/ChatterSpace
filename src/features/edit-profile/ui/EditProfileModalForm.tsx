'use client';

import React, { useEffect } from 'react';
import {
  editProfileModalFormSchema,
  editProfileModalFormType,
  editProfilePayloadType,
} from '../model/editProfileModalFormSchema';
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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/shared/lib/hooks';
import { toast } from 'sonner';

const EditProfileModalForm: React.FC = () => {
  const router = useRouter();
  const { onClose, data } = useModal();
  const { profile } = data;

  const editProfileModalForm = useForm<editProfileModalFormType>({
    resolver: zodResolver(editProfileModalFormSchema),
    defaultValues: {
      name: '',
      image: null,
    },
  });

  useEffect(() => {
    if (profile) {
      editProfileModalForm.setValue('name', profile.username);
      editProfileModalForm.setValue('image', profile.imageUrl);
    }
  }, [profile, editProfileModalForm]);

  const onSubmit = async (data: editProfileModalFormType) => {
    const { dirtyFields } = editProfileModalForm.formState;

    let newImageUrl = profile!.imageUrl;

    if (dirtyFields.image && data.image) {
      const imageName = profile?.imageUrl.replace(
        'https://hfyahiqwhtkmontdplnz.supabase.co/storage/v1/object/public/images/profiles/',
        ''
      );

      const { publicUrl, error } = await changeImage({
        bucketName: 'images',
        filePath: 'profiles',
        image: data.image,
        oldFilePath: `profiles/${imageName}`,
      });

      if (error) {
        toast.error(`Image change error: ${error}`);
        return;
      }

      if (publicUrl) {
        newImageUrl = publicUrl;
      }
    }

    const payload: editProfilePayloadType = {
      name: data.name,
      imageUrl: newImageUrl,
    };

    try {
      await axios.patch('/api/profile', payload);

      editProfileModalForm.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...editProfileModalForm}>
      <form
        onSubmit={editProfileModalForm.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <InputField
          control={editProfileModalForm.control}
          name="name"
          label="Username"
          className="mb-8"
        />
        <FormField
          control={editProfileModalForm.control}
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
export default EditProfileModalForm;
