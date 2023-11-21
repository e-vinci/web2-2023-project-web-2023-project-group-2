import anime from 'animejs/lib/anime.es';
import covidImage from '../../img/covid-19-5551910_1280.png';
import covidRed from '../../img/virus-rouge.png';

const HomePage = () => {
  const main = document.querySelector('main');
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
      duration: anime.random(2000, 3500),
      scale: 8,
      opacity: 0
    });
  }
}
export default HomePage;