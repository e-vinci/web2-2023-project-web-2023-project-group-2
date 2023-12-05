/* eslint-disable prefer-destructuring */
import anime from 'animejs/lib/anime.es'
import { getAuthenticatedUser } from '../../utils/auths'
import Navigate from '../Router/Navigate';


const GamePage = async () => {

  if(!getAuthenticatedUser()) {
    Navigate('/login')
    return;
  };


  const score = 0;
  let clickValue = await takeCLickValue();

  const main = document.querySelector('main');
  
  const text = ` 
  <div class="container d-flex justify-content-evenly align-items-center flex-column" style="">
    <div class="alert alert-dark" role="alert">
    ${score}
    </div>
  <div><button class="covidClick"></button></div>
  </div>
  <div class="upgradesDiv">
  </div>  
  `;


  main.innerHTML = text;


  const covidClick = document.querySelector('.covidClick');

  covidClick.addEventListener('click', clickOnCovid)
  covidClick.addEventListener('click', popValueAnimation)

  function clickOnCovid() {
    anime({
      targets : covidClick,
      scale : 1.2,
      duration : 200,
      easing : 'easeOutQuart',
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
    const y = e.clientY-28;

    const clickFeedback = document.createElement('div');
    clickFeedback.classList.add('click-feedback');
    clickFeedback.innerHTML = `+${ clickValue}`;
    clickFeedback.style.left = `${x  }px`;
    clickFeedback.style.top = `${y  }px`;
    clickFeedback.style.userSelect = 'none';
    document.body.appendChild(clickFeedback)

    anime.timeline({
      targets: clickFeedback,
      opacity: 0,
      duration: 800,
      translateY: '-100',
      easing: 'easeOutSine'
    }).add({
      complete() {
        clickFeedback.remove();
      }
    })
  }
  
  
// Partie upgrades Teodor
const upgradesTable = document.querySelector('.upgradesDiv')


try{
  const response = await fetch('/api/upgrades');

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const upgrades = await response.json();

  renderUpgradesMenu(upgrades)
  const upgradeButtons = document.querySelectorAll('.upgradeButton')

  upgradeButtons.forEach((upgrade) => {
    upgrade.addEventListener('click', (event) => {
       onClickEvent(event.target.dataset.id)
    });
  });
}catch (err){
  console.error('GamePage::error: ', err); 
}


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
        <tr class='upgradeButton' data-id=${upgrade.id}>
          <td data-id=${upgrade.id}>${upgrade.title}</td>
        </tr>`;
      });

      return upgradesLines;
    }

    async function onClickEvent(upgradeID){
    const username = getAuthenticatedUser().username;
      
      const options = {
        method: 'PATCH',
        body: JSON.stringify({
          username,
          upgradeID
        }),
         headers : {
          'Content-Type': 'application/json',
         },
      };
      const response = await fetch('/api/clicker/upgradeClicker',options);

      if(!response.ok){
        console.log(response.status);
        throw Error `fetch error`
      };
      const upgradeClick = await response.json();
      console.log(upgradeClick);
      
    clickValue = await takeCLickValue();

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