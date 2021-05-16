import './App.css';
import './components/IntroMenu.js'
import IntroMenu from './components/IntroMenu.js';
import  {UsersProvider} from "./context/UsersContext";
function App() {
  return (
    <UsersProvider>
      <div className="App">
        <IntroMenu/>
      </div>
    </UsersProvider>
   
  );
}

export default App;
