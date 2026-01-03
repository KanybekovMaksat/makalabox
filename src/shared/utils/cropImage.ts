export const getCroppedImage = async (
  imageSrc: string,
  crop: any
): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement('canvas');
  canvas.width = 650;
  canvas.height = 450;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    650,
    450
  );

  return canvas.toDataURL('image/jpeg', 0.9);
};
