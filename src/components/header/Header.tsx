import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import iconMenu from '../../assets/icon-menu.svg';

import LogOutButton from '../buttons/LogOutButton';

import './style.scss';

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <header className="flex flex__alignCenter">
      <img
        onClick={() => setOpenMenu((prev) => !prev)}
        src={iconMenu}
        alt="Menu"
      />

      <nav className={`flex  ${openMenu ? '' : 'close'}`}>
        <ul className="flex flex__alignCenter">
          <NavLink to="/material">Matériel</NavLink>
          <NavLink to="/create-material">Ajouter une annonce</NavLink>
          <NavLink to="/booking">Réservation</NavLink>
          <NavLink to="/messaging">Messagerie</NavLink>
          <LogOutButton />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
