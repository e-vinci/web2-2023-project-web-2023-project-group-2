// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import image from '../../img/logoNav.png';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" style="cursor: pointer;">
          <img src="${image}" alt="Logo" width="70" height="70" class="d-inline-block align-text-top logo-img" data-uri="/">
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

        <!-- Formulaire de Connexion à l'intérieur de la Navbar -->
        <div class="position-absolute top-100 start-0 end-0 p-4 collapse" id="loginCollapse" style="background-color: #343a40; z-index: 1000;">
          <div class="card card-body" style="background-color: #343a40; border: none;">
            <!-- Contenu du Collapse -->
            <form class="px-4 py-3">
              <div class="mb-3">
                <label for="exampleDropdownFormEmail1" class="form-label text-light">Email</label>
                <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
              </div>
              <div class="mb-3">
                <label for="exampleDropdownFormPassword1" class="form-label text-light">Mot de passe</label>
                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Mot de passe">
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="dropdownCheck">
                <label class="form-check-label text-light" for="dropdownCheck">
                  Se souvenir de moi
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Se connecter</button>
            </form>
            <div class="dropdown-divider" style="background-color: #6c757d;"></div>
            <a class="dropdown-item text-light" href="#">Mot de passe oublié ?</a>
          </div>
        </div>
      </div>
    </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
