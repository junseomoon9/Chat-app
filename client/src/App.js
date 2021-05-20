import './App.css';
import './components/IntroMenu.js'
import IntroMenu from './components/IntroMenu.js';
import  {UsersProvider} from "./context/UsersContext";
import {ConversationsProvider} from "./context/ConversationsContext"
function App() {
  return (
    <UsersProvider>
      <ConversationsProvider>
        <div className="App">
          <IntroMenu/>
        </div>
      </ConversationsProvider>
    </UsersProvider>
   
  );
}

export default App;
