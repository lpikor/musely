import './App.css';
import MyBigCalendar from './components/MyBigCalendar/MyBigCalendar';
import Chat from './components/Chat/Chat';
import Locations from './components/Locations/Locations';

function App() {
  return (
    <div className="App">
      <Chat />
      <MyBigCalendar />
      <Locations />
    </div>
  );
}

export default App;
