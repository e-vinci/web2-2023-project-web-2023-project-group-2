import button from '../../img/arrowButton.png';

const Register = () => {
    const main = document.querySelector('main');
    const text = `
  <div class="position-absolute top-50 start-50 translate-middle card bg-transparent border border-dark" style="width: 18rem">
    <form>
    <h1 class="fontRubikBubbles card-header text-center border border-dark">Register</h1>
      <div class="card-body">
        <label>user</label>
        <input type="text" class="form-control border border-dark">
        <p></p>

        <label>password</label><br>
        <input type="text" class="form-control  border border-dark">
        <p></p>

        <label>confirm password</label><br>
        <input type="text" class="form-control  border border-dark">
        <p></p>

        <input type="image" src="${button}" class="confirmButton">
      </div>
    </form>
  </div>
    `;
    main.innerHTML = text;
  
  };
  
  export default Register;