// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoNav from '../../img/logoNav.png';
import iconeConnexion from '../../img/iconeConnexion.png';
import iconeRegister from '../../img/iconRegister.png';


const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" style="cursor: pointer;">
          <img src="${logoNav}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img" data-uri="/">
          <span style="color: #fff; font-size: 30px; font-weight: bold; margin-left: 10px; cursor: pointer;" data-uri="/">CovidClicker</span>
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
          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#loginCollapse" aria-expanded="false" aria-controls="loginCollapse">
            Login
          </button>
        </div>

        <!-- ... (votre code existant) ... -->

        <!-- Formulaire de Connexion à l'intérieur de la Navbar -->
        <div class="position-absolute top-100 start-0 end-0 p-4 collapse" id="loginCollapse" style="background-color: #212529; z-index: 1000;">
          <div class="card card-body text-center" style="background-color: #212529; border: none;">
            <!-- Contenu du Collapse -->
            <form class="px-4 py-3">
              <div class="mb-3 d-flex justify-content-center">
              <a class="navbar-brand d-flex align-items-center" style="cursor: pointer;">
                <img src="${iconeConnexion}" alt="Logo" width="45" height="45" class="d-inline-block align-text-top logo-img" data-uri="/" me-15>
              </a>

              <a class="navbar-brand d-flex align-items-center" style="cursor: pointer;">
                <img src="${iconeRegister}" alt="Logo" width="40" height="40" class="d-inline-block align-text-top logo-img" data-uri="/" ms-15>
              </a>
              </div>
            </form>
            <div class="dropdown-divider" style="background-color: #6c757d;"></div>
          </div>
        </div>
        </div>
        </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
