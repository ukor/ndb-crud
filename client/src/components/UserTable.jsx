import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
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
					user.action = "<button>Delete</button> <button>Edit</button>"
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
						{data: 'username', readOnly: true},
						{data: 'email', readOnly: true},
						{data: 'password', readOnly: true},
						{ data: 'age', readOnly: true },
						{ data: "action", renderer: "html", readOnly: true },
						{
							renderer: function(instance, td, row, col, prop, value, cellProperties) {
							  const escaped = Handsontable.helper.stringify(value);
							  let img = null;

							  if (escaped.indexOf('http') === 0) {
								img = document.createElement('IMG');
								img.src = value;

								Handsontable.dom.addEvent(img, 'mousedown', function(event) {
								  event.preventDefault();
								});

								Handsontable.dom.empty(td);
								td.appendChild(img);
							  }
							  else {
								Handsontable.renderers.TextRenderer.apply(this, arguments);
							  }

							  return td;
							}
						  }
					],
					startCols: 5,
					rowHeaders: true,
					'separator': Handsontable.plugins.ContextMenu.SEPARATOR,

				}}
			/>
		</div>
	);
}

export default UserTable;