import { IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export function ModalPopup({ active, setActive, children }) {
  return (
    <div
      onClick={() => setActive(false)}
      className={`fixed duration-500  h-screen w-screen bg-[black]/30 top-0 left-0 flex  pointer-events-none items-center justify-center z-10 ${
        active ? 'opacity-100 pointer-events-auto' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`p-[10px] duration-300 rounded bg-[white] w-[320px] md:w-[450px] flex flex-col ${
          active ? 'scale-100' : 'scale-0'
        }`}
      >
        <IconButton onClick={() => setActive(false)} className="self-end">
          <CancelRoundedIcon />
        </IconButton>

        {children}
      </div>
    </div>
  );
}
