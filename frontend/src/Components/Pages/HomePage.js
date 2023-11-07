import covidImage from '../../img/covid-19-5551910_1280.png'

const HomePage = () => {
  const main = document.querySelector('main');
  const text = `
  
  <div class="d-flex justify-content-center my-3">
    <a href="/game" class="card text-bg-dark">
        <img src="${covidImage}" class="card-img" alt="PLAY" width="400" height="400">
        <div class="card-img-overlay"><p class="card-text">PLAY</p></div>
    </a>
  </div>

  `;
  main.innerHTML = text;

};

export default HomePage;
