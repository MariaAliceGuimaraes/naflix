import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaGift, FaCaretDown } from 'react-icons/fa';

import LogoNetflix from '../../assets/logo.png';

import { Container, RoutesMenu, Profile } from './styles';

const NavBar: React.FC = () => {
  const [isBlack, setIsBlack] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setIsBlack(window.scrollY > 10));

    // Executa quando a pagina for desconstruida
    return () => {
      window.removeEventListener('scroll', () =>
        setIsBlack(window.scrollY > 10),
      );
    };
  }, []);

  return (
    <Container isBlack={isBlack}>
      <RoutesMenu>
        <img src={LogoNetflix} alt="dahdjahdkja" />
        <ul>
          <li style={{ fontWeight: 'bold' }}>Inicio</li>
          <li>Series</li>
          <li>Filmes</li>
          <li>Mais Recentes</li>
          <li>Minha Lista</li>
        </ul>
      </RoutesMenu>
      <Profile>
        <div>
          <input placeholder="Pesquisar filmes..."/>
        </div>
        <FaSearch />
        <FaGift />
        <FaBell />
        <button type="button">
          <img
            src="https://cdn.dribbble.com/users/230875/screenshots/12078079/media/c08285d2e039896a565cffeb5eb44a15.jpg"
            alt="imagem profile usuario"
          />
        </button>
        <FaCaretDown />
      </Profile>
    </Container>
  );
};

export default NavBar;
