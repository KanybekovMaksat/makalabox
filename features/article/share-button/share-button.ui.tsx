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

'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from '@heroui/react';

import {
  Share2,
  Send,
  Link,
  MessageCircle,
  Share,
} from 'lucide-react';

type ShareButtonProps = {
  id: number;
  title?: string;
};

export function ShareButton({ id, title }: ShareButtonProps) {
  const articlePath = `https://makalabox.com/article/${id}`;

  /* копирование ссылки */
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(articlePath)
      .then(() => toast.success('Путь скопирован в буфер обмена'))
      .catch(() => toast.error('Ошибка при копировании пути'));
  };

  /* открыть Telegram / WhatsApp */
  const handleShareClick = (social: 'telegram' | 'whatsapp') => {
    const encoded = encodeURIComponent(articlePath);
    const url =
      social === 'telegram'
        ? `https://t.me/share/url?url=${encoded}`
        : `https://wa.me/?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /* нативный Web Share API (мобильные браузеры) */
  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Makalabox',
          text: title || 'Это отличная статья, которую вы должны прочитать!',
          url: articlePath,
        });
      } catch (e) {
        /* пользователь отменил – молча игнорируем */
      }
    } else {
      toast.info('Web Share API не поддерживается вашим браузером');
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            variant="light"
            aria-label="поделиться"
          >
            <Share2 className="w-5 h-5 text-default-500" />
          </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Поделиться" variant="flat">
        <DropdownItem
          key="copy"
          startContent={<Link className="w-4 h-4" />}
          onPress={handleCopyLink}
        >
          Скопировать ссылку
        </DropdownItem>

        <DropdownItem
          key="telegram"
          startContent={<Send className="w-4 h-4" />}
          onPress={() => handleShareClick('telegram')}
        >
          Telegram
        </DropdownItem>

        <DropdownItem
          key="whatsapp"
          startContent={<MessageCircle className="w-4 h-4" />}
          onPress={() => handleShareClick('whatsapp')}
        >
          WhatsApp
        </DropdownItem>

        <DropdownItem
          key="native"
          startContent={<Share className="w-4 h-4" />}
          onPress={handleWebShare}
        >
          Поделиться...
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}