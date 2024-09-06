import './App.css';
import Calendar from './components/Calendar/Calendar';
import Chat from './components/Chat/Chat';
import Locations from './components/Locations/Locations';

function App() {
  return (
    <div className="App">
      <Chat />
      <Calendar />
      <Locations />
    </div>
  );
}

export default App;
