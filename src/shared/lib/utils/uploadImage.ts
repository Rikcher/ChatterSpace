import { clientCreateClient } from '@/shared/lib/utils';
import { v4 as uuidv4 } from 'uuid';

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

  return { publicUrl: publicUrlData.publicUrl };
};
