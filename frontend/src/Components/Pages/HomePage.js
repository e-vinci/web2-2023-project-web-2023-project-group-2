import imageFond from '../../img/world-36479_1280.png';

const HomePage = () => {
  const main = document.querySelector('main');
  const text = `<div class = "text-center"> <img class ="img-fluid" src=${imageFond}>`;
  main.innerHTML = text;

};

export default HomePage;
