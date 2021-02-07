import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AppBar from './Components/appbar'
import Home from "./views/home"
import Chat from "./views/chat"
import About from "./views/about"
function App() {
  return (
    <Router>
      <div className="App">
        <AppBar/>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/chat" component={Chat}></Route>
          <Route path="/about" component={About}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
