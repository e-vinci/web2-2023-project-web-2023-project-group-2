import button from '../../img/arrowButton.png';
import Navigate from '../Router/Navigate';

const Register = () => {
    const main = document.querySelector('main');
    const text = `
  <div class="position-absolute top-50 start-50 translate-middle card bg-transparent border border-dark" style="width: 18rem">
    <form>
    <h1 class="fontRubikBubbles card-header text-center border border-dark">Register</h1>
      <div class="card-body">
        <label>user</label>
        <input type="text" class="form-control border border-dark userName">
        <p class="userNameError"></p>

        <label>password</label><br>
        <input type="password" class="form-control  border border-dark password">
        <p class="weakPassword"></p>

        <label>confirm password</label><br>
        <input type="password" class="form-control  border border-dark confirmPassword">
        <p class="passwordNoMatch"></p>

        <input type="image" src="${button}" class="confirmButton">
      </div>
    </form>
  </div>
    `;
    main.innerHTML = text;

    const form = document.querySelector('.confirmButton');
    form.addEventListener('submit', register);
  
    async function register(e){
      e.preventDefault();

      const userName = document.querySelector('.userName').value;
      const password = document.querySelector('.password').value;
      const confirmPassword = document.querySelector('.confirmPassword').value;

      const options = {
        method: 'POST',
        body: JSON.stringify({
          userName,
          password,
          confirmPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch('/api/auths', options);

      if (response.userPresent){
        const userPresent = document.querySelector('.userName');
        userPresent.innerHTML = "nom d'utilisateur déjà pris";
      }else if (response.weakPassword){
        const weakPassword = document.querySelector('.weakPassword');
        weakPassword.innerHTML = "mot de passe trop faible";
      }else if (response.passwordNoMatch){
        const passwordNoMatch = document.querySelector('.passwordNoMatch');
        passwordNoMatch.innerHTML = "les mots de passe ne correspondent pas";
      }else{
        Navigate('/game');
      }
    }
  };
  
  export default Register;