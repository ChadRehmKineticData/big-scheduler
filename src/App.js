import logo from './logo.svg';
import './App.css';
import './components/BasicScheduler'
import BasicScheduler from './components/BasicScheduler';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          React Big Scheduler Spike.
        </p>
      </header>
      <div>
        <BasicScheduler />
      </div>
    </div>
  );
}

export default App;
