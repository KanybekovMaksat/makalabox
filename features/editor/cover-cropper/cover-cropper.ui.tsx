import { useRef, useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/modal";
import { X, Save, Image as ImageIcon, Upload, RefreshCw } from 'lucide-react';
import {Slider} from "@heroui/slider";
import {Button, ButtonGroup} from "@heroui/button";

interface CropperModalProps {
  src: string | null;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  onSave: (imageUrl: string) => void;
}

const CropperModal: React.FC<CropperModalProps> = ({
  src,
  modalOpen,
  setModalOpen,
  onSave,
}) => {
  const [slideValue, setSlideValue] = useState<number>(1);
  const cropRef = useRef<AvatarEditor | null>(null);

  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      onSave(dataUrl);
      setModalOpen(false);
    }
  };

  return (
    <Modal 
      isOpen={modalOpen} 
      onClose={() => setModalOpen(false)}
      size="3xl"
      placement="center"
      classNames={{
        base: "bg-background",
        wrapper: "flex justify-center items-center",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-foreground">
              Редактировать обложку
            </ModalHeader>
            <ModalBody className="flex flex-col items-center gap-4">
              <AvatarEditor 
                width={900} 
                height={300} 
                ref={cropRef} 
                image={src || ''}  
                scale={slideValue}
                className="rounded-lg border border-default-200"
              />
              <div className="w-full max-w-2xl">
                <p className="text-small text-foreground-600 mb-2">
                  Масштаб: {slideValue.toFixed(1)}x
                </p>
                <Slider
                  aria-label="Масштаб"
                  size="md"
                  minValue={1}
                  maxValue={10}
                  step={0.1}
                  defaultValue={1}
                  value={slideValue}
                  onChange={setSlideValue}
                  classNames={{
                    base: "max-w-full",
                    track: "border-s-cyan-500",
                    filler: "bg-gradient-to-r from-cyan-500 to-blue-500",
                    thumb: "bg-gradient-to-r from-cyan-500 to-blue-500",
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                startContent={<X className="w-4 h-4" />}
              >
                Отмена
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
                startContent={<Save className="w-4 h-4" />}
              >
                Сохранить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface CoverCropperProps {
  update?: boolean;
  data?: string;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (imageUrl: string) => void;          // ← data-url
  onPositionChange?: (position: string) => void; // center / top / bottom
}

export function CoverCropper({ update, setUpdate, data, onChange, onPositionChange}: CoverCropperProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const dropzoneRef = useRef<Dropzone | null>(null);
  
  // Загружаем сохраненное изображение только на клиенте
useEffect(() => {
  if (typeof window === 'undefined') return;
  const saved = localStorage.getItem('savedImage');
  setSavedImage(saved);
  if (saved) onChange?.(saved);   // ← сразу сообщаем родителю
}, [onChange]);

  const handleDrop = (dropped: File[]) => {
    setSrc(URL.createObjectURL(dropped[0]));
    setModalOpen(true);
  };

const handleSaveImage = (imageUrl: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('savedImage', imageUrl);
  }
  setSavedImage(imageUrl);
  setModalOpen(false);
  onChange?.(imageUrl);         
};

const handleSelectAnotherPhoto = () => {
  setSrc(null);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('savedImage');
  }
  setSavedImage(null);
  onChange?.('');        
  if (dropzoneRef.current) dropzoneRef.current.open();
};

  if (update) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <img
            src={data}
            alt="Предпросмотр обложки"
            className="w-full min-w-[94%] max-w-full h-[300px] object-cover rounded-lg border border-default-200"
          />
          <p className="text-small text-foreground-600">
            Примерное отображение обложки
          </p>
          <img
            src={data}
            alt="Предпросмотр на маленьких экранах"
            className="w-full max-w-[650px] h-[250px] object-cover rounded-lg border border-default-200 mt-3"
          />
          <p className="text-small text-foreground-600">
            Примерное отображение обложки на маленьких экранах
          </p>
        </div>
        <Button
          variant="bordered"
          className="my-3"
          onPress={() => setUpdate?.(false)}
          startContent={<RefreshCw className="w-4 h-4" />}
        >
          Выбрать другое фото
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mt-2">
      <div className="hidden">
        <Dropzone
          ref={dropzoneRef}
          onDrop={handleDrop}
          noKeyboard
          preventDropOnDocument={true}

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

      {!savedImage || savedImage.length === 0 ? (
        <Dropzone
          onDrop={handleDrop}
          noKeyboard
        
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`w-full h-64 rounded-xl border-2 border-dashed transition-colors ${
                isDragActive 
                  ? 'border-primary bg-primary/10' 
                  : 'border-default-300 hover:border-default-400'
              } relative flex flex-col justify-center items-center cursor-pointer gap-3 p-4`}
            >
              <input
                onChange={(e) => handleDrop(e.target.files as unknown as File[])}
                {...getInputProps()}
              />
              <div className={`p-3 rounded-full ${
                isDragActive ? 'bg-primary/20' : 'bg-default-100'
              }`}>
                {isDragActive ? (
                  <Upload className="w-8 h-8 text-primary" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-default-500" />
                )}
              </div>
              <p className={`text-center text-medium ${
                isDragActive ? 'text-primary' : 'text-foreground-600'
              }`}>
                {isDragActive 
                  ? 'Отпустите для загрузки' 
                  : 'Перетащите изображение или кликните для выбора'}
              </p>
              <p className="text-small text-foreground-500">
                Поддерживаемые форматы: JPEG, PNG, SVG, WebP
              </p>
            </div>
          )}
        </Dropzone>
      ) : (
        <div className="w-full">
          <div 
            className="relative rounded-xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              className="w-full border border-default-200 h-[320px] object-cover rounded-xl cursor-pointer"
              src={savedImage}
              alt="Обложка"
              title="Обложка"
            />
          
            {isHovered && (
              <div
                className="absolute inset-0 bg-black/70 rounded-xl flex flex-col justify-center items-center cursor-pointer transition-all duration-300 p-4"
                onClick={handleSelectAnotherPhoto}
              >
                <div className="text-center space-y-3">
                  <p className="text-white text-lg font-medium pointer-events-none">
                    Вы можете поменять обложку
                  </p>
                  <Button
                    color="primary"
                    variant="shadow"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    onPress={(e) => {
                      e.stopPropagation();
                      handleSelectAnotherPhoto();
                    }}
                    startContent={<ImageIcon className="w-4 h-4" />}
                  >
                    Выбрать другое фото
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <CropperModal
        modalOpen={modalOpen}
        src={src}
        setModalOpen={setModalOpen}
        onSave={handleSaveImage}
      />
    </div>
  );
}