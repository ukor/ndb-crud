import React from 'react';
import TopNavigation from '../components/Navigation/TopNavigation';
import Usertable from '../components/UserTable';

function ViewUsers() {
	return (
		<div>
			<TopNavigation />
			<div className="columns">
				<div className="column is-four-fifths is-offset-one-fifth">
					<Usertable />
				</div>
			</div>
		</div>
	);
}

export default ViewUsers;