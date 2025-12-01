import { MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';

export const NavbarItem = ({ title, to, icon, selected, setSelected }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
    setSelected(title);
  };
  return (
    <MenuItem active={selected === title} onClick={handleClick} icon={icon}>
      <Link to={to} onClick={() => setSelected(title)}>
        <p>{title}</p>
      </Link>
    </MenuItem>
  );
};
