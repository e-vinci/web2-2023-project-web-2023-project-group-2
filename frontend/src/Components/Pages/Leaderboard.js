const Leaderboard = () => {
    const main = document.querySelector('main');
    const text = `
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</table>
    `;
    main.innerHTML = text;
  
  };
  
  export default Leaderboard;