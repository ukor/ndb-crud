import React, { useEffect, useState } from 'react';
import TopNavigation from '../components/Navigation/TopNavigation';
import AdduserForm from '../components/AddUserForm'
import axios from 'axios';

function EditUser(props) {
	console.log(props);
	const [user, setuser] = useState(false);
	useEffect(() => {
		const { userId } = props.match.params
		console.log(userId)
		async function getUser(userId) {
			// get the user from db
			let user = await axios.get(`/api/users/${userId}`, {});
			console.log(user);
			// pass the user as props
			setuser(user.data);
		}

		getUser(userId);

	 }, []);
	return (
		<div>
			<TopNavigation />
			<div className="columns">
				<div className="column is-three-fifths is-offset-one-fifth">
					{
						(user ? (
							<AdduserForm userDetails={user} />
						) : (
								'Loading'
						))
					}
				</div>
			</div>
		</div>
	);
}

export default EditUser;