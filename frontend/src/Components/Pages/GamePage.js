import anime from 'animejs/lib/anime.es'
import covidImage from '../../img/playButton.png'

const GamePage = () => {
  const score = 0;
  const clickValue = 1;

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
      <div id="clickFeedback" class="click-feedback"></div>
    </div>
  </div>
  </div>
  `;
  main.innerHTML = text;

  const covidClick = document.querySelector('#covidImg')

  covidClick.addEventListener('click', clickOnCovid)
  covidClick.addEventListener('clcik', popValueAnimation)

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

   function popValueAnimation(e) {
    const x = e.clientX;
    const y = e.clientY;

    const clickFeedback = document.getElementById('clickFeedback');
    clickFeedback.innerHTML = `+${ clickValue}`;
    clickFeedback.style.left = `${x  }px`;
    clickFeedback.style.top = `${y  }px`;

    anime.timeline({
      targets: clickFeedback,
      opacity: 1,
      translateY: '-50',
      duration: 500,
      easing: 'easeOutQuad'
    }).add({
      opacity: 0,
      translateY: '-50',
      duration: 500,
      easing: 'easeInQuad',
      complete() {
        clickFeedback.innerHTML = '';
        clickFeedback.style.opacity = 0;
        clickFeedback.style.transform = 'translateY(0)';
      }
    });

  } 

  
};

export default GamePage;