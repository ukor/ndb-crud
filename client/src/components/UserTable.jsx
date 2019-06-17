import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';

function UserTable() {

	const [users, setUsers] = useState([])

	async function editUser(changes, source) {
		if (source === 'edit') {
			let requestData = {};
			// array destructuring - contains details about the feild changed
			const [row, fieldChanged, oldData, newData] = changes[0];
			console.log(row, fieldChanged, oldData, newData);

			// only make request when newData !== oldData
			if (oldData !== newData) {
				// make network request to update
				requestData[fieldChanged] = newData;
				let updateResponse = await axios.put(`/api/users/${users[row]._id}`, requestData);
				const { data } = updateResponse;
				if (data.type === 'success') {
					// put success message in view
					console.log(data.message);
				} else {
					// put error message in view
					console.log(data.message);
				}
			}

		}
	}

	useEffect(() => {
		async function fetchUsers() {
			try {
				let users = await axios.get('/api/users');
				const { data } = users;
				console.log(data);
				data.forEach(user => {
					user.action = `<button>Delete</button> <a className='button'`
				});
				setUsers(data);
			} catch (exception) {
				console.log(exception);
			}
		}
		fetchUsers();
	}, [])

	return (
		<div>
			<HotTable
				id="hot"
				settings={{
					data: users,
					dataSchema: { username: null, email: null, password: null, age: null },
					colHeaders: ['Username', 'Email', 'Password', 'Age', 'Action'],
					columns: [
						{data: 'username'},
						{data: 'email'},
						{data: 'password'},
						{ data: 'age' },
						{ data: "action", renderer: "html", readOnly: true }
					],
					startCols: 5,
					rowHeaders: true,
					'separator': Handsontable.plugins.ContextMenu.SEPARATOR,
				}}
				afterChange={(e, s) => editUser(e, s)}
				afterListen={(e) => console.log(e)}
				licenseKey= "non-commercial-and-evaluation"
			/>
		</div>
	);
}

export default UserTable;