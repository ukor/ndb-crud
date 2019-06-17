import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';

function UserTable() {

	const [users, setUsers ] = useState([])

	useEffect(() => {
		async function fetchUsers() {
			try {
				let users = await axios.get('/api/users');
				const { data } = users;
				console.log(data);
				data.forEach(user => {
					user.action = `<button>Delete</button> <a className='button' href='/edit-user/${user._id}'>Edit</a>`
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
				licenseKey= "non-commercial-and-evaluation"
			/>
		</div>
	);
}

export default UserTable;