/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import anime from 'animejs/lib/anime.es';
import covidImage from '../../img/covid-19-5551910_1280.png'
import covidRed from '../../img/virus-rouge.png'

const HomePage = () => {
  const main = document.querySelector('main');
  // eslint-disable-next-line no-unused-vars
  const body = document.querySelector('body');
 
  body.style.overflow = 'hidden';
  main.className = 'homepage_body';

 
  const text = ` 
  <div class="covidContainer"></div>
  
  <div>
  <h1 class="title" >Covid Clicker</h1>
    <a href="/game">
        <img src="${covidImage}" class="play" alt="PLAY"> 
    </a>
  </div>
  `;
  main.innerHTML = text;

  const covidContainer = document.querySelector('.covidContainer');
  createCovidIcons();
  covidContainer.style.top = "96px";
  
  function createCovidIcons() {
    let full = false;
    let totalImg = 0;
    while(!full){
      totalImg += 40;
      if(totalImg < main.offsetWidth){
        const newImg = document.createElement("img");
        newImg.setAttribute('src', covidRed);
        newImg.setAttribute('style', 'width: 15px');
        newImg.style.marginRight = '25px';
        newImg.style.top = '50px';
        newImg.style.userSelect = 'none';
        newImg.classList.add("covidIcon");
        covidContainer.appendChild(newImg);

      anime({
          targets: newImg,
          translateY: '100vh',
          easing: 'linear',
          loop: true,
          duration: anime.random(1700, 3000),
          scale: 10,
          opacity: 0
        });
      }else{
        full = true;
      }
    }
  }

};

export default HomePage;
