// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import image from '../../img/logoNav.png';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/" style="cursor: pointer;">
          <img src="${image}" alt="Logo" width="40" height="40" class="d-inline-block align-text-top logo-img">
          <span style="color: #fff; font-size: 24px; font-weight: bold; margin-left: 10px; cursor: pointer;">CovidClicker</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/game">Game</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/new">New Page</a>
            </li>
          </ul>
        </div>
        <div class="ms-auto">
          <button class="btn btn-apocalyptic btn-custom me-2">Se connecter</button>
          <button class="btn btn-success">S'inscrire</button>
        </div>
      </div>
    </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
