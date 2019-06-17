import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import AddUser from './pages/AddUser';
import EditUser from './pages/Edit';
import ViewUsers from './pages/ViewUsers';
// const Spinner = <Loading />;

// const AddUser = Loadable({
// 	loader: () => import('./pages/AddUser'),
// 	loading: Spinner
// })

function App() {
	return (
		<Switch>
			<Route exact path='/' component={AddUser} />
			<Route exact path='/users' component={ViewUsers} />
			<Route exact path='/edit-user/:userId' component={EditUser} />
		</Switch>
  );
}

export default App;
