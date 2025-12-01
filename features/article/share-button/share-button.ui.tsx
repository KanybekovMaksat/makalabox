// import { useState } from 'react';
// import { toast } from 'react-toastify';

// import {
//   Box,
//   IconButton,
//   ListItemIcon,
//   Menu,
//   MenuItem,
//   Tooltip,
// } from '@mui/material';

// import ShareIcon from '@mui/icons-material/Share';
// import TelegramIcon from '@mui/icons-material/Telegram';
// import InsertLinkIcon from '@mui/icons-material/InsertLink';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// type ShareButtonProps = {
//   id: number;
// };

// export function ShareButton(props: ShareButtonProps) {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const articlePath = `https://makalabox.com/article/${props.id}`;

//   const handleCopyLink = () => {
//     navigator.clipboard
//       .writeText(articlePath)
//       .then(() => {
//         toast.success('Путь скопирован в буфер обмена');
//         setAnchorEl(null);
//       })
//       .catch((error) => {
//         console.error('Ошибка при копировании пути: ', error);
//         toast.error('Ошибка при копировании пути');
//       });
//   };

//   const handleShareClick = (socialMedia: string) => {
//     let shareLink: string;
//     if (socialMedia === 'telegram') {
//       shareLink = `https://t.me/share/url?url=${encodeURIComponent(
//         articlePath
//       )}`;
//     } else if (socialMedia === 'whatsapp') {
//       shareLink = `https://wa.me/?text=${encodeURIComponent(articlePath)}`;
//     }
//     setAnchorEl(null);
//     window.open(shareLink, '_blank');
//   };

//   return (
//     <>
//       <Tooltip title="Поделиться">
//         <IconButton
//           aria-label="поделиться"
//           onClick={handleClick}
//           id="basic-button"
//           aria-controls={open ? 'basic-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//         >
//           <ShareIcon className='hover:text-second-100' />
//         </IconButton>
//       </Tooltip>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <Box className="font-bold">
//           <MenuItem onClick={handleCopyLink}>
//             <ListItemIcon>
//               <InsertLinkIcon fontSize="small" />
//             </ListItemIcon>
//             Скопировать ссылку
//           </MenuItem>
//           <MenuItem onClick={() => handleShareClick('telegram')}>
//             <ListItemIcon>
//               <TelegramIcon fontSize="small" color="primary" />
//             </ListItemIcon>
//             Отправить в Telegram
//           </MenuItem>
//           <MenuItem
//             onClick={() => handleShareClick('whatsapp')}
//             className="text-xs"
//           >
//             <ListItemIcon>
//               <WhatsAppIcon fontSize="small" color="success" />
//             </ListItemIcon>
//             Отправить в WhatsApp
//           </MenuItem>
//         </Box>
//       </Menu>
//     </>
//   );
// }

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import ShareIcon from '@mui/icons-material/Share';
import TelegramIcon from '@mui/icons-material/Telegram';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

type ShareButtonProps = {
  id: number;
  title?: string;
};

export function ShareButton(props: ShareButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const articlePath = `https://makalabox.com/article/${props.id}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(articlePath)
      .then(() => {
        toast.success('Путь скопирован в буфер обмена');
        setAnchorEl(null);
      })
      .catch((error) => {
        console.error('Ошибка при копировании пути: ', error);
        toast.error('Ошибка при копировании пути');
      });
  };

  const handleShareClick = (socialMedia: string) => {
    let shareLink: string;
    if (socialMedia === 'telegram') {
      shareLink = `https://t.me/share/url?url=${encodeURIComponent(
        articlePath
      )}`;
    } else if (socialMedia === 'whatsapp') {
      shareLink = `https://wa.me/?text=${encodeURIComponent(articlePath)}`;
    }
    setAnchorEl(null);
    window.open(shareLink, '_blank');
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Makalabox',
          text: props.title || "Это отличная статья, которую вы должны прочитать!",
          url: articlePath,
        });
      } catch (error) {
        console.error('Error sharing article: ', error);
      }
    } else {
      toast.info('Web Share API not supported in your browser');
    }
    setAnchorEl(null);
  };

  return (
      <Tooltip title="Поделиться">
        <IconButton
          aria-label="поделиться"
          onClick={handleWebShare}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <ShareIcon className="hover:text-second-100" />
        </IconButton>
      </Tooltip>
  );
}
