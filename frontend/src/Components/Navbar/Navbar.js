import logoNav from '../../img/logoNav.png';
import iconeLogin from '../../img/iconeLogin.png';
import iconeLogout from '../../img/iconLogout.png';
import Navigate from '../Router/Navigate';
import { isAuthenticated, clearAuthenticatedUser } from '../../utils/auths';

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
          <a class="nav-link custom-link large-link" href="#" data-uri="/game">Game</a>
        </div>
        <div class="navbar-center">
          <a class="nav-link custom-link large-link" href="#" data-uri="/leaderboard">Leaderboard</a>
        </div>
        <div class="navbar-right">
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
          <a class="nav-link custom-link large-link" href="#" data-uri="/login">Game</a>
        </div>
        <div class="navbar-center">
          <a class="nav-link custom-link large-link" href="#" data-uri="/leaderboard">Leaderboard</a>
        </div>
        <div class="navbar-right">
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
};

export default Navbar;
