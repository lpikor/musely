import './App.css';
import MyBigCalendar from './components/MyBigCalendar/MyBigCalendar';
import Chat from './components/Chat/Chat';
import Locations from './components/Locations/Locations';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Logout from './components/Logout/Logout';

function App() {
  return (
    <div className="App">
      <h1>Musely</h1>
      <Register />
      <Login />
      <Logout />
      <Profile />
      <Chat />
      <MyBigCalendar />
      <Locations />
    </div>
  );
}

export default App;
