import { MenuItem } from 'react-pro-sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const NavbarItem = ({ title, to, icon, selected, setSelected }) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(to);
    setSelected(title);
  };

  return (
    <MenuItem 
      active={selected === title} 
      onClick={handleClick} 
      icon={icon}
    >
      <Link 
        href={to} 
        onClick={(e) => {
          e.preventDefault(); 
          handleClick();
        }}
        className="block w-full"
      >
        <p>{title}</p>
      </Link>
    </MenuItem>
  );
};