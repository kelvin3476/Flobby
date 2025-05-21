import heic2any from 'heic2any';

export async function ImageExtensionConverter(file: File): Promise<Blob> {
  const result = await heic2any({
    blob: file,
    toType: 'image/jpeg',
  });

  return Array.isArray(result) ? result[0] : result;
}
