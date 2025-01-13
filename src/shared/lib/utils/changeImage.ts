import { clientCreateClient } from '@/shared/lib/utils';
import { v4 as uuidv4 } from 'uuid';

interface uploadImageProps {
  bucketName: string;
  filePath: string;
  oldFilePath: string;
  image: File;
}

export const changeImage = async ({
  bucketName,
  image,
  filePath,
  oldFilePath,
}: uploadImageProps) => {
  const supabase = clientCreateClient();
  const imageName = uuidv4();

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(`${filePath}/${imageName}`, image, { upsert: true });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${filePath}/${imageName}`);

  const { error: deleteError } = await supabase.storage
    .from(bucketName)
    .remove([oldFilePath]);

  if (deleteError) {
    console.warn(`Failed to delete old file: ${deleteError.message}`);
  }

  return { publicUrl: publicUrlData.publicUrl };
};
