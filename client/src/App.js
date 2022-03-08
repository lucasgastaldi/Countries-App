import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import CreateActivity from './components/CreateActivity';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>        
          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/home' component={Home}></Route>
          <Route exact path='/activities' component={CreateActivity}></Route>
          <Route exact path='/home/:id' component={Detail}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
