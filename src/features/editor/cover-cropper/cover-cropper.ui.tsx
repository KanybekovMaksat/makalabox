import { Box, Button, CardMedia, Modal, Slider } from '@mui/material';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import React, { useRef, useState } from 'react';

const boxStyle = {
  width: '950px',
  height: '500px',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  objectFit: 'cover',
  alignItems: 'center',
};
const modalStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  objectFit: 'cover',
};

interface CropperModalProps {
  src: string | null;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const CropperModal: React.FC<CropperModalProps> = ({
  src,
  modalOpen,
  setModalOpen,
}) => {
  const [slideValue, setSlideValue] = useState<number>(1);
  const cropRef = useRef<AvatarEditor | null>(null);

  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      localStorage.setItem('savedImage', URL.createObjectURL(blob));
      setModalOpen(false);
    }
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor width={900} height={300} ref={cropRef} image={src || ''}  scale={slideValue} />
        <Slider
          min={1}
          max={10}
          sx={{
            margin: '0 auto',
            width: '80%',
            color: 'cyan',
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(_, value) => setSlideValue(value as number)}
        />
        <Box>
          <Button
            size="small"
            sx={{ marginRight: '10px', color: 'white', borderColor: 'white' }}
            variant="outlined"
            onClick={() => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: '#5596e6' }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

interface CoverCropperProps {
  update: boolean;
  data?: string;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CoverCropper({ update, setUpdate, data }: CoverCropperProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  // 👈 1. Создаем ref для доступа к input file
  const dropzoneRef = useRef<Dropzone | null>(null);
  
  const handleDrop = (dropped: File[]) => {
    setSrc(dropped[0] as unknown as string);
    setModalOpen(true);
  };

  const handleSelectAnotherPhoto = () => {
    setSrc(null);
    localStorage.setItem('savedImage', '');
    // 👈 2. Вызываем click на скрытом элементе input
    if (dropzoneRef.current) {
        dropzoneRef.current.open();
    }
  };
  const imageRef = localStorage.getItem('savedImage');

  if (update) {
    return (
      <div>
        <div className="">
          <img
            src={data}
            alt=""
            className="min-w-[94%] max-w-[100%] min-h-[300px] max-h-[300px] object-cover rounded "
          />
          <p>Примерное отображения обложки </p>
          <img
            src={data}
            alt=""
            className="max-w-[650px] min-h-[250px] max-h-[250px] object-cover rounded mt-3"
          />
          <p>Примерное отображения обложки на маленьких экранах</p>
        </div>
        <Button
          variant="outlined"
          className="my-3"
          onClick={() => setUpdate?.(false)}
        >
          Выбрать другое фото
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mt-2 flex gap-5">
      {/* 👈 3. Dropzone всегда отображается, но скрыто */}
      <div style={{ display: 'none' }}>
        <Dropzone
          ref={dropzoneRef} // 👈 4. Привязываем ref к Dropzone
          onDrop={handleDrop}
          noKeyboard
          // Устанавливаем `preventDropOnDocument` в true, чтобы предотвратить случайный дроп
          preventDropOnDocument={true} 
          accept={{ 'image/jpeg': ['.jpeg', '.png', '.svg'] }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input 
                onChange={(e) => handleDrop(e.target.files as unknown as File[])}
                {...getInputProps()}
              />
            </div>
          )}
        </Dropzone>
      </div>

      {!imageRef || imageRef.length === 0 ? (
        // Блок для первого выбора файла (Drag and Drop)
        <Dropzone
          // При первом выборе файла мы используем Dropzone как видимый элемент
          onDrop={handleDrop}
          noKeyboard
          accept={{ 'image/jpeg': ['.jpeg', '.png', '.svg'] }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`w-full h-[50px] rounded border-2 border-dashed  ${
                isDragActive ? 'border-second-100' : 'border-pc-300'
              } relative flex justify-center items-center cursor-pointer`}
            >
              <input
                onChange={(e) => handleDrop(e.target.files as unknown as File[])}
                {...getInputProps()}
                placeholder="Drag  drop some files here, or click to select files"
              />
              <p
                className={`text-center ${
                  isDragActive ? 'text-second-100' : 'text-pc-300'
                } `}
              >
                {isDragActive ? '+' : ' Выберите картинку для обложки'}
              </p>
            </div>
          )}
        </Dropzone>
      ) : (
        // Блок, когда фото уже выбрано и отображается
        <div className="w-full">
          <div 
            className="relative rounded-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardMedia
              component="img"
              className="w-full border border-[gray]/30 min-h-[300px] max-h-[320px] object-cover rounded cursor-pointer"
              image={imageRef}
              alt="Обложка"
              title="Обложка"
            />
          
            {isHovered && (
              <div

                className="absolute inset-0 bg-[black] bg-opacity-80 rounded flex flex-col justify-center items-center cursor-pointer transition-opacity duration-300"
                onClick={handleSelectAnotherPhoto} 
              >
                <p className="text-[white] text-lg mb-2 pointer-events-none">
                  Вы можете поменять обложку
                </p>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#5596e6', color: 'white' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAnotherPhoto();
                  }}
                >
                  Выбрать другое фото
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <CropperModal
        modalOpen={modalOpen}
        src={src}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}
