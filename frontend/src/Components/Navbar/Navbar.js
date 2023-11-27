// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoNav from '../../img/logoNav.png';
import iconeLogin from '../../img/iconLogin.png';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
    <nav class="navbar navbar-expand-lg transparent-navbar">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" style="cursor: pointer;">
          <img src="${logoNav}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img" data-uri="/">
        </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link custom-link" href="#" data-uri="/game">Game</a>
            </li>
            <li class="nav-item">
              <a class="nav-link custom-link" href="#" data-uri="/leaderboard">Leaderboard</a>
            </li>
          </ul>
          <button class="btn btn-custom" type="button">
            <img src="${iconeLogin}" width="35" height="35" href="#" data-uri="/login">
          </button>
        </div>
      </div>
    </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
