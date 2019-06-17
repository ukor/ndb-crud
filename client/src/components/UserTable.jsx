import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { useSnackbar } from 'notistack';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios';

function UserTable() {

	const [users, setUsers] = useState([])
	const { enqueueSnackbar } = useSnackbar();

	async function editUser(changes, source) {
		if (source === 'edit') {
			let requestData = {};
			// array destructuring - contains details about the feild changed
			const [row, fieldChanged, oldData, newData] = changes[0];
			// console.log(row, fieldChanged, oldData, newData);

			// only make request when newData !== oldData
			if (oldData !== newData) {
				// make network request to update
				requestData[fieldChanged] = newData;
				let updateResponse = await axios.put(`/api/users/${users[row]._id}`, requestData);
				const { data } = updateResponse;
				if (data.type === 'success') {
					// put success message in view
					enqueueSnackbar(data.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'left' } });
				} else {
					// put error message in view
					enqueueSnackbar(data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'left' } });
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
						{
							data: '_id',
							readOnly: true,
							renderer: function (instance, td, row, col, prop, value, cellProperties) {
								let deleteButton = null;
								deleteButton = document.createElement('BUTTON');
								deleteButton.className = 'button is-danger';
								deleteButton.innerText = 'Delete';
								deleteButton.setAttribute('data-id', value);
								Handsontable.dom.addEvent(deleteButton, 'click', async function (event) {
									event.preventDefault();
									let userId = event.target.getAttribute('data-id');
									let delete_response = await axios.delete(`/api/users/${userId}`);
									const { data } = delete_response;
									if (data.type === 'success') {
										// put success message in view
										console.log(data.message);
										// to trigger re-render of the table update the users state
										let _newUser = users.filter(user => user._id !== userId);
										setUsers(_newUser);

										enqueueSnackbar(data.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'left' } });

									} else {
										// put error message in view
										console.log(data.message);
										enqueueSnackbar(data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'left' } });
									}
								});

								Handsontable.dom.empty(td);
								td.appendChild(deleteButton);

								return td;
							}
						  }
					],
					startCols: 5,
					rowHeaders: true,
					'separator': Handsontable.plugins.ContextMenu.SEPARATOR,
				}}
				afterChange={(e, s) => editUser(e, s)}
				licenseKey= "non-commercial-and-evaluation"
			/>
		</div>
	);
}

export default UserTable;