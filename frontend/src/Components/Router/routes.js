import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
// import NewPage from '../Pages/NewPage';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Leaderboard from '../Pages/Leaderboard'

const routes = {
  '/': HomePage,
  '/game': GamePage,
  // '/new': NewPage,
  '/game/leaderboard': Leaderboard,
  '/login': Login,
  '/register': Register,
};

export default routes;
