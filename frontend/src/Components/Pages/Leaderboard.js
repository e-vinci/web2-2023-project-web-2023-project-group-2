async function getUsers() {
  try{

    const response = await fetch('/api/leaderBoard');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    
    const users = await response.json();
    return users;


  }catch (err){
    console.error('LeaderBoard::error : ',err)
    throw err;
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
   ${tableLines}
   </tbody>
  </table>
  `;
main.innerHTML = text;

function tableLines(){
  let lines = '';

  users?.forEach(user => {
    lines += `<tr>
    <td>${user.findIndex()}
    <td>${user.username}</td>
    <td>${user.nbClick}`
  });
  return lines
}
}
export default Leaderboard;
