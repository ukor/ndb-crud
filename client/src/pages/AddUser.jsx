import React from 'react';
import TopNavigation from '../components/Navigation/TopNavigation';
import AdduserForm from '../components/AddUserForm';

function Adduser() {
	return (
		<div>
			<TopNavigation />
			<div className="columns">
				<div className="column is-three-fifths is-offset-one-fifth">
					<AdduserForm />
				</div>
			</div>
		</div>
	);
}

export default Adduser;