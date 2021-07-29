import logo from './logo.svg';
import './App.css';
import './components/BasicScheduler';
import BasicScheduler from './components/BasicScheduler';
import { events } from './events';
import { resources } from './resources';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>React Big Scheduler Spike.</p>
      </header>
      <div>
        <BasicScheduler events={events} resources={resources} />
      </div>
    </div>
  );
}

export default App;
