import anime from 'animejs/lib/anime.es'
import covidImage from '../../img/covid-19-5551910_1280.png'

const GamePage = () => {
  const score = 0;
  // const clickValue = 1;

  const main = document.querySelector('main');

  main.className = 'homepage_body'
  
  const text = ` 
  <div class="container d-flex justify-content-evenly align-items-center vh-100 flex-column">
  <div class="alert alert-dark" role="alert">
  ${score}
  </div>
  <div class="covidContainer">
    <div id="clickFeedback" class="click-feedback"></div>
    <div>
      <img src="${covidImage}" class="covidClick" alt="PLAY" id="covidImg" width="350" height="350"> 
    </div>
  </div>
  </div>
  `;
  main.innerHTML = text;

  const covidClick = document.querySelector('#covidImg')

  covidClick.addEventListener('click', clickOnCovid)
  // covidClick.addEventListener('clcik', popValueAnimation)

  function clickOnCovid() {
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

  /* function popValueAnimation(e) {
    
  } */

  
};

export default GamePage;