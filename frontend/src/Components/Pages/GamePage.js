import anime from 'animejs/lib/anime.es'
import covidImage from '../../img/playButton.png'
import { getAuthenticatedUser } from '../../utils/auths'
import Navigate from '../Router/Navigate';


const GamePage = async () => {

  if(!getAuthenticatedUser()) {
    Navigate('/login')
    return;
  };


  const score = 0;
  const clickValue = await takeCLickValue();

  const main = document.querySelector('main');

  main.className = 'homepage_body'
  
  const text = ` 
  <div class="container d-flex justify-content-evenly align-items-center vh-100 flex-column">
  <div class="alert alert-dark" role="alert">
  ${score}
  </div>
  <div class="covidContainer">
    <div>
      <div id="clickFeedback" class="click-feedback"></div>
      <img src="${covidImage}" class="covidClick" alt="PLAY" id="covidImg" width="350" height="350"> 
      
    </div>
  </div>
  </div>
  
  <div class="upgradesDiv">
  </div>
  `;


  main.innerHTML = text;

 

  const covidClick = document.querySelector('#covidImg')

  covidClick.addEventListener('click', clickOnCovid)
  covidClick.addEventListener('click', popValueAnimation)

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
      easing: 'easeOutQuad',
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
  
  
// Partie upgrades Teodor
const upgradesTable = document.querySelector('.upgradesDiv')

fetch('api/upgrades')
.then((response) => {
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  return response.json();
})
.then((upgrades) => {
  renderUpgradesMenu(upgrades)
})
.catch((err) => {
  console.error('GamePage::error: ', err);  
})

    function renderUpgradesMenu(menu){
      const tableAsString = getMenuTableAsString(menu);
      upgradesTable.innerHTML += tableAsString;
    }

    function getMenuTableAsString(menu){
      const menuTableLines = getAllTableLines(menu)
      const menuTable = addLinesToTable(menuTableLines);
      return menuTable;
    }

    function addLinesToTable(tableLines){
      const menuTable = `
      <div class="position-absolute top-50 end-0 translate-middle">
      <div class="table-responsive pt-5">
      <table class="table custom-table">
        ${tableLines}
      </table>
      </div>
      </div>`;
      return menuTable;  
    }

    function getAllTableLines(menu){
      let upgradesLines='';

      menu?.forEach((upgrade) => {
        upgradesLines += `
        <tr>
          <td>${upgrade.title}</td>
        </tr>`;
      });

      return upgradesLines;
    }


    async function takeCLickValue () {
      

      // eslint-disable-next-line prefer-destructuring
      const username = getAuthenticatedUser().username;

      const options = {
        method: 'POST',
        body: JSON.stringify({
          username,
        }),
        headers : {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('/api/clicker/valueClickUser', options);

      if(!response.ok){throw Error `fetch error`};
      const click = await response.json();
      console.log(click);

      return click;
    }

  
};

export default GamePage;