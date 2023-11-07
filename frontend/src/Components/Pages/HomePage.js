const HomePage = () => {
  const main = document.querySelector('main');
  const text = `<div><ul>
  <li >
  <a  href="/game" >Game</a>
</li>
</ul></div>`;
  main.innerHTML = text;

};

export default HomePage;
