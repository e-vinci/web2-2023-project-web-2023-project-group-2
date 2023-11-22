import anime from 'animejs/lib/anime.es'
import covidImage from '../../img/covid-19-5551910_1280.png'

const GamePage = () => {

  const main = document.querySelector('main');
  
  const text = ` 
  <div class="container d-flex justify-content-center align-items-center vh-100">
  <div class="covidContainer">
    <div>
      <img src="${covidImage}" class="covidClick" alt="PLAY" id="covidImg"> 
    </div>
  </div>
  </div>
  `;
  main.innerHTML = text;

  const covidClick = document.querySelector('#covidImg')

  covidClick.addEventListener('click', clickOnCovid)

  function clickOnCovid() {
    console.log('clické')

    anime({
      targets : '.covidClick',
      scale : 1.2,
      duration : 200,
      easing : 'easeInOutQuad',
      complete : animeEnd
    })
    
  }

  function animeEnd() {
    anime({
      targets : '.covidClick',
      scale : 1.0,
      duration : 100,
      easing : 'easeInOutQuad',
    })
  }

  
};

export default GamePage;
