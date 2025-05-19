import heic2any from 'heic2any';

export async function ImageExtensionConverter(file: Blob): Promise<Blob> {
  const result = await heic2any({
    blob: file,
    toType: 'image/jpeg', // Jpg x
  });

  return Array.isArray(result) ? result[0] : result;
}
