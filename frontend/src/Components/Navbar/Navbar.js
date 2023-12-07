import anime from 'animejs/lib/anime.es';
import logoNav from '../../img/logoNav.png';
import iconeLogin from '../../img/iconeLogin.png';
import iconeLogout from '../../img/iconLogout.png';
import Navigate from '../Router/Navigate';
import { isAuthenticated, clearAuthenticatedUser } from '../../utils/auths';

const addHoverAnimation = (element) => {
  element.addEventListener('mouseenter', () => {
    anime({
      targets: element,
      scale: 1.3,
      duration: 300,
    });
  });

  element.addEventListener('mouseleave', () => {
    anime({
      targets: element,
      scale: 1,
      duration: 300,
    });
  });
};

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  let navbar;

  if (isAuthenticated()) {
    navbar = `
      <div class="navbar">
        <div class="navbar-logo">
          <img src="${logoNav}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img" data-uri="/">
        </div>
        <div class="navbar-center">
          <a class="nav-link custom-link large-link animate-on-hover" href="#" data-uri="/game">Game</a>
        </div>
        <div class="navbar-center">
          <a class="nav-link custom-link large-link animate-on-hover" href="#" data-uri="/leaderboard">Leaderboard</a>
        </div>
        <div class="navbar-right animate-on-hover">
          <img src="${iconeLogout}" width="50" height="50" id="logout">
        </div>
      </div>
    `;
  } else {
    navbar = `
      <div class="navbar">
        <div class="navbar-logo">
          <img src="${logoNav}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img" data-uri="/">
        </div>
        <div class="navbar-center">
          <a class="nav-link custom-link large-link animate-on-hover" href="#" data-uri="/login">Game</a>
        </div>
        <div class="navbar-center">
          <a class="nav-link custom-link large-link animate-on-hover" href="#" data-uri="/leaderboard">Leaderboard</a>
        </div>
        <div class="navbar-right animate-on-hover">
          <img src="${iconeLogin}" width="50" height="50" href="#" data-uri="/login">
        </div>
      </div>
    `;
  }

  navbarWrapper.innerHTML = navbar;

  if (isAuthenticated()) {
    const logoutButton = document.querySelector('#logout');
    logoutButton.addEventListener('click', () => {
      clearAuthenticatedUser();
      Navbar();
      Navigate('/');
    });
  }

  // Ajoutez l'animation Anime.js aux éléments avec la classe "animate-on-hover" au survol
  const elementsToAnimate = document.querySelectorAll('.animate-on-hover');

  elementsToAnimate.forEach((element) => {
    addHoverAnimation(element);
  });
};

export default Navbar;
