/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const getUsers = async () => {
  try{
    const response = await fetch('/api/leaderBoard');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const users = await response.json;
    return users;


  }catch (err){
    console.error('LeaderBoard::error : ', err)
  }
}

const Leaderboard = async () => {

  const main = document.querySelector('main');
  const users = await getUsers();

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
}

export default Leaderboard;
