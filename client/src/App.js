import './App.css';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import  {UsersProvider} from "./context/UsersContext";
import {ConversationsProvider} from "./context/ConversationsContext"
import ChatMenu from "./components/ChatMenu"
import Login from './components/Login'
import Signup from "./components/Signup"

function App() {
  return (
    <UsersProvider>
      <ConversationsProvider>
        <div className="App">
          <BrowserRouter>
            <div className="intro-menu"> 
                  <Switch>
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/signup" component={Signup}/>
                      <Route exact path="/chat" component={ChatMenu}></Route>
                      <Redirect from="/" to="/login" />
                  </Switch>
              </div>
          </BrowserRouter>
        </div>
      </ConversationsProvider>
    </UsersProvider>
   
  );
}

export default App;
