// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoNav from '../../img/logoNav.png';
import iconeConnexion from '../../img/iconeConnexion.png';
import iconeRegister from '../../img/iconRegister.png';
import iconeLogin from '../../img/iconLogin.png';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" style="cursor: pointer;">
          <img src="${logoNav}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img" data-uri="/">
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link custom-link" href="#" data-uri="/game">Game</a>
            </li>
            <li class="nav-item">
              <a class="nav-link custom-link" href="#" data-uri="/new">New Page</a>
            </li>
          </ul>

          <!-- Bouton Login avec Collapse -->
          <button class="btn btn-custom" type="button" data-bs-toggle="collapse" data-bs-target="#loginCollapse" aria-expanded="false" aria-controls="loginCollapse">
            <img src="${iconeLogin}" width="35" height="35">
          </button>
        </div>

        <!-- Formulaire de Connexion à l'intérieur de la Navbar -->
        <div class="collapse position-absolute top-100 start-0 end-0 p-4" id="loginCollapse" style="z-index: 1000; transition: height 0.3s ease;">
  <div class="card card-body text-center" style="border: none; background-color: transparent;">
    <!-- Contenu du Collapse -->
    <form class="px-4 py-3">
      <div class="mb-3 d-flex justify-content-center">
        <a class="navbar-brand d-flex align-items-center" style="cursor: pointer; margin-right: 100px;">
          <img src="${iconeConnexion}" alt="Logo" width="45" height="45" class="d-inline-block align-text-top logo-img" data-uri="/login">
        </a>

        <a class="navbar-brand d-flex align-items-center" style="cursor: pointer;">
          <img src="${iconeRegister}" alt="Logo" width="40" height="40" class="d-inline-block align-text-top logo-img" data-uri="/register">
        </a>
      </div>
    </form>
    <div class="dropdown-divider" style="border: none;"></div>
  </div>
</div>
          </div>
        </div>
      </div>
    </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
