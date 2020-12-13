import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Logout from './Components/Logout';
import Orders from './Components/Orders';

function App() {
  const [force, setforce] = useState(0);
  useEffect(() => {
    window.addEventListener('resize', force_render);
    return () => {
      window.removeEventListener('resize', force_render);
    }
  }, [])

  const force_render = () => {
    setforce(force => force + 1);
  }

  return (
    <div >
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/dashboard/:name' component={Dashboard} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/orders' component={Orders} />
      </Switch>
    </div >
  );
}

export default App;
