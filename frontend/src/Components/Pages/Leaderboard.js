const Leaderboard = () => {
  const main = document.querySelector('main');
  const text = `
    <table class="table">
     <thead>
       <tr>
         <th scope="col">#</th>
         <th scope="col">Pseudo</th>
         <th scope="col">score</th>
       </tr>
     </thead>
     <tbody>
     
     </tbody>
    </table>
    `;
  main.innerHTML = text;
};

export default Leaderboard;
