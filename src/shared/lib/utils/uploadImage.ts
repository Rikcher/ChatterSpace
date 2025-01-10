import { clientCreateClient } from '@/shared/lib/utils';

interface uploadImageProps {
  bucketName: string;
  filePath: string;
  image: File;
}

export const uploadImage = async ({
  bucketName,
  image,
  filePath,
}: uploadImageProps) => {
  const supabase = clientCreateClient();
  const imageName = `${Date.now()}-${image.name}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(`${filePath}/${imageName}`, image);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${filePath}/${imageName}`);

  return { publicUrl: publicUrlData.publicUrl };
};
