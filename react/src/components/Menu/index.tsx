import React from 'react';
import { StyledMenu } from './styles';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

interface MenuProps {
  open: boolean;
}

const Menu: React.FC<MenuProps> = ({ open }: MenuProps) => {
  return (
    <StyledMenu  open={open}>
      <Link to="/events">
        <FiAlertTriangle/>
        &nbsp;Eventos
      </Link>
    </StyledMenu>
  )
}
export default Menu;
