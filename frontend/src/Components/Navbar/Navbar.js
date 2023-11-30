import logoNav from '../../img/logoNav.png';
import iconeLogin from '../../img/iconLogin.png';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
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
      <img src="${iconeLogin}" width="50" height="50" href="#" data-uri="/login">
    </div>
    </div>
`
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;

