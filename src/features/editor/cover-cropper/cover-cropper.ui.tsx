import { Box, Button, Modal } from '@mui/material';
import Cropper from 'react-easy-crop';
import { useRef, useState } from 'react';
import { getCroppedImage } from '~shared/utils/cropImage';
import Dropzone from 'react-dropzone';

interface Props {
  src: string | null;
  open: boolean;
  onClose: () => void;
  onSave: (img: string) => void;
}

export const CropperModal = ({ src, open, onClose, onSave }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState<any>(null);

  const handleSave = async () => {
    if (!src || !croppedArea) return;
    const image = await getCroppedImage(src, croppedArea);
    onSave(image);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 700,
          height: 520,
          bgcolor: '#111',
          margin: 'auto',
          mt: 10,
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: 420 }}>
          <Cropper
            image={src || ''}
            crop={crop}
            aspect={650 / 450}
            onCropChange={setCrop}
            onCropComplete={(_, area) => setCroppedArea(area)}
          />
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};



export function CoverCropper() {
  const [src, setSrc] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(
    localStorage.getItem('cover')
  );

  const dropzoneRef = useRef<any>(null);

  const handleDrop = (files: File[]) => {
    if (!files.length) return;
    setSrc(URL.createObjectURL(files[0]));
    setOpen(true);
  };


  const handleSave = (img: string) => {
    localStorage.setItem('cover', img);
    setImage(img);
  };

  return (
    <div className="w-full">
      <Dropzone
        ref={dropzoneRef}
        onDrop={handleDrop}
        accept={{ 'image/*': [] }}
        noKeyboard
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ display: 'none' }}>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      {!image ? (
        <div
          onClick={() => dropzoneRef.current?.open()}
          className="
            h-[60px] border-2 border-dashed rounded
            flex items-center justify-center cursor-pointer
            text-gray-400 hover:border-blue-400 hover:text-blue-400
            transition
          "
        >
          Выберите обложку
        </div>
      ) : (
        <Box className="flex flex-col gap-3">
          <img
            src={image}
            alt="Обложка"
            className="w-[650px] h-[450px] object-cover rounded cursor-pointer"
            onClick={() => dropzoneRef.current?.open()}
          />

          <Button
            variant="outlined"
            onClick={() => {
              setImage(null);
              localStorage.removeItem('cover');
              dropzoneRef.current?.open();
            }}
          >
            Выбрать другое фото
          </Button>
        </Box>
      )}
      <CropperModal
        src={src}
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
