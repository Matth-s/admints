import { NavLink } from 'react-router-dom';

import LogOutButton from '../buttons/LogOutButton';

import './style.scss';

const Header = () => {
  return (
    <header className="flex flex__alignCenter">
      <nav>
        <ul className="flex">
          <NavLink to={'/material'}>Materiel</NavLink>
          <NavLink to={'/create-material'}>
            Ajouter une annonce
          </NavLink>
          <NavLink to="/booking">Réservation</NavLink>
          <NavLink to="/messaging">Messagerie</NavLink>
        </ul>
      </nav>

      <LogOutButton />
    </header>
  );
};

export default Header;
