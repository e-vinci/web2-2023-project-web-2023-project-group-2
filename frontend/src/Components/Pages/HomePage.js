import anime from 'animejs/lib/anime.es';
import covidImage from '../../img/playButton.png';
import covidRed from '../../img/virus-rouge.png';
import Navigate from '../Router/Navigate';

const HomePage = () => {
  const main = document.querySelector('main');
  const body = document.querySelector('body');
 
  body.style.overflow = 'hidden';
  main.className = 'homepage_body';

 
  const text = ` 
  <div class="covidContainer"></div>
  <h1 class="title fontRubikBubbles " >Covid Clicker</h1>
  <div>
    <img src="${covidImage}" class="play position-absolute top-50 start-50 translate-middle" alt="PLAY"> 
  </div>
  `;
  main.innerHTML = text;

  const covidContainer = document.querySelector('.covidContainer');
  covidContainer.style.top = "96px";
  createCovidIcons();
  const playButton = document.querySelector('.play');
  playButton.addEventListener('click', gamePage);

  function gamePage(){
    Navigate('/game');
  }
  
  function createCovidIcons() {
    let totalImg = 40;
    do{ 
      createOneCovid();
      totalImg += 40;
    }while(totalImg < main.offsetWidth)
  }

  function createOneCovid(){
    const newImg = document.createElement("img");
    newImg.setAttribute('src', covidRed);
    newImg.setAttribute('style', 'width: 15px');
    newImg.style.marginRight = '25px';
    newImg.style.top = '50px';
    newImg.style.userSelect = 'none';
    const hue = Math.floor(Math.random() * 360);
    newImg.style.filter = `hue-rotate(${hue}deg)`;
    newImg.classList.add("covidIcon");
    covidContainer.appendChild(newImg);

    anime({
      targets: newImg,
      translateY: '100vh',
      easing: 'linear',
      loop: true,
      duration: anime.random(2500, 4000),
      scale: 7,
      opacity: 0
    });
  }
}
export default HomePage;