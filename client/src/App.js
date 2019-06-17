import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddUser from './pages/AddUser';
import ViewUsers from './pages/ViewUsers';

function App() {
	return (
		<Switch>
			<Route exact path='/' component={AddUser} />
			<Route exact path='/users' component={ViewUsers} />
		</Switch>
  );
}

export default App;
