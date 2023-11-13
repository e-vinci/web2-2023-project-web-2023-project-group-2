import covidImage from '../../img/play_button.png'

const HomePage = () => {
  const main = document.querySelector('main');
  const body = document.querySelector('body');
  body.style.overflow = 'hidden';

  main.className = 'homepage_body';

  const text = ` 
  <div class="play">
    <a href="/game">
        <img src="${covidImage}" class="card-img" alt="PLAY"> 
    </a>
  </div>
  `;

  let annimation = anime({
    targets: 'card-img',
    translateX: 250
  });
  
  main.innerHTML = text;
  
};

export default HomePage;
