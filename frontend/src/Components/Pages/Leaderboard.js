import anime from 'animejs/lib/anime.es';
import covidRed from '../../img/virus-rouge.png';
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const getUsers = async () => {
  try {
    const response = await fetch('/api/leaderBoard');
    console.log('reponse');
    console.log(response);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const users = await response.json();

    return users;
  } catch (err) {
    console.error('LeaderBoard::error : ', err);
  }
};

const Leaderboard = async () => {
  const main = document.querySelector('main');
  const body = document.querySelector('body');
 
  body.style.overflow = 'hidden';
  const users = await getUsers();

  const text = `
  <div class="covidContainerLeaderboard"></div>
  <div class="table-container">
  <table class="table">
   <thead>
     <tr>
       <th scope="col">#</th>
       <th scope="col">Pseudo</th>
       <th scope="col">score</th>
     </tr>
   </thead>
   <tbody>
   ${getAllTableLines()}
   </tbody>
  </table>
  </div>
  `;
  main.innerHTML = text;
  const covidContainer = document.querySelector('.covidContainerLeaderboard');
  createCovidIcons();

  function getAllTableLines() {
    let line = '';
    users.forEach((element) => {
      line += `
    <tr>
      <td>${users.indexOf(element)+1}</td>
      <td>${element.username}</td>
      <td>${element.nbClick}</td>
    </tr>`;
    });

    return line;
  }

  function createCovidIcons() {
    let totalImg = 35;
    do{ 
      createOneCovid();
      totalImg += 35;
    }while(totalImg < main.offsetWidth)
  }

  function createOneCovid(){
    const newImg = document.createElement("img");
    newImg.setAttribute('src', covidRed);
    newImg.setAttribute('style', 'width: 15px');
    newImg.style.userSelect = 'none';

    const positionX = Math.random() * (main.offsetWidth - 15);
    const positionY = Math.random() * (main.offsetHeight - 15);
    newImg.style.position = 'relative';
    newImg.style.left = `${positionX}px`;
    newImg.style.top = `${positionY}px`;

    const hue = Math.floor(Math.random() * 360);
    newImg.style.filter = `hue-rotate(${hue}deg)`;
    newImg.classList.add("covidIcon");
    covidContainer.appendChild(newImg); 

    anime({
      targets: newImg,
      easing: 'linear',
      loop: true,
      duration: anime.random(1500, 7000),
      scale: anime.random(0, 8),
      opacity: 0
    });


  }
  
};

export default Leaderboard;
