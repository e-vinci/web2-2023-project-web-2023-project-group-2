import anime from 'animejs/lib/anime.es';
import logoNav from '../../img/logoNav.png';
import iconeLogin from '../../img/iconeLogin.png';
import iconeLogout from '../../img/iconLogout.png';
import iconeLogoutRed from '../../img/iconLogoutRed.png';
import iconeLoginBlue from '../../img/iconeLoginBlue.png';
import Navigate from '../Router/Navigate';
import { clearAuthenticatedUser, getAuthenticatedUser } from '../../utils/auths';

const Navbar = () => {

  const anonymousUserNavbar = `
    <div class="navbar">
      <div class="navbar-logo">
        <img src="${logoNav}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img logoNav changeCursor" data-uri="/">
      </div>
      <div class="navbar-center">
        <a class="nav-link custom-link large-link animate-on-hover changeCursor" href="#" data-uri="/login">Game</a>
      </div>
      <div class="navbar-center">
        <a class="nav-link custom-link large-link animate-on-hover changeCursor" href="#" data-uri="/leaderboard">Leaderboard</a>
      </div>
      <div class="navbar-right animate-on-hover">
        <img src="${iconeLogin}" width="50" height="50" class="login-icon changeCursor" href="#" data-uri="/login">
      </div>
    </div>
  `;
  const authenticatedUserNavbar = `
    <div class="navbar">
      <div class="navbar-logo">
        <img src="${logoNav}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img logoNav changeCursor" data-uri="/">
      </div>
      <div class="navbar-center">
        <a class="nav-link custom-link large-link animate-on-hover changeCursor" href="#" data-uri="/game">Game</a>
      </div>
      <div class="navbar-center">
        <a class="nav-link custom-link large-link animate-on-hover changeCursor" href="#" data-uri="/leaderboard">Leaderboard</a>
      </div>
      <div class="navbar-right animate-on-hover">
        <img src="${iconeLogout}" width="50" height="50" id="logout" class="changeCursor">
      </div>
    </div>
  `;

  const navbar = document.querySelector('#navbarWrapper');
  if (navbar) {
    navbar.innerHTML = getAuthenticatedUser() ? authenticatedUserNavbar : anonymousUserNavbar;
  }

  if (getAuthenticatedUser()) {
    const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        clearAuthenticatedUser();
        Navbar();
        Navigate('/');
      });

      logoutButton.addEventListener('mouseover', () => {
        logoutButton.src = iconeLogoutRed;
      });

      logoutButton.addEventListener('mouseleave', () => {
        logoutButton.src = iconeLogout;
      });
    }
  } else {
    const loginButton = document.querySelector('.login-icon');
    if (loginButton) {
      loginButton.addEventListener('mouseover', () => {
        loginButton.src = iconeLoginBlue;
      });

      loginButton.addEventListener('mouseleave', () => {
        loginButton.src = iconeLogin;
      });
    }
  }

  const addHoverAnimation = (element) => {
    if (element) {
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
    }
  };

  const logo = document.querySelector('.logoNav');
  addHoverAnimation(logo);

  const elementsToAnimate = document.querySelectorAll('.animate-on-hover');
  elementsToAnimate.forEach((element) => {
    addHoverAnimation(element);
  });

  const cursor = document.querySelector('.cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.display = 'block';
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    });
  }

  const changeCursor = document.querySelectorAll('.changeCursor');
  changeCursor.forEach((cur) => {
    if (cur) {
      cur.addEventListener('mouseover', () => {
        if (cursor) {
          cursor.className = 'cursor-click';
        }
      });
      cur.addEventListener('mouseout', () => {
        if (cursor) {
          cursor.classList.remove('cursor-click');
          cursor.className = 'cursor';
        }
      });
    }
  });
};

export default Navbar;
