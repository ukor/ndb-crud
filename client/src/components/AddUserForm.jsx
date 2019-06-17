import React, { useState } from 'react'
import axios from 'axios';

function AdduserForm(props) {

	// set default form values base on the state of props
	const [operation, setOperation] = useState(props.userDetails ? 'edit' : 'add');
	const [_id, setId] = useState(props.userDetails ? props.userDetails._id : '');
	const [username, setUsername] = useState(props.userDetails ? props.userDetails.username : '');
	const [password, setPassword] = useState(props.userDetails ? props.userDetails.password : '');
	const [email, setEmail] = useState(props.userDetails ? props.userDetails.email : '');
	const [age, setAge] = useState(props.userDetails ? props.userDetails.age : '');

	async function handleSubmit (event){
		event.preventDefault();

		// make network request base on operation field
		if (operation === 'add') {
			// add to database
			let resp = await axios.post('/api/users', {
				username, email, password, age
			});
			const { data } = resp;
			if (data.type) throw new Error(data.message);

		} else {
			// do update
			let resp = await axios.put(`/api/users/${_id}`, { username, password, email, age });
			console.log('update response => ', resp);
		}

		// empty form values
		setUsername('');
		setPassword('');
		setEmail('');
		setAge('');
	}

	return (
		<form onSubmit={handleSubmit} >
			<input type="hidden" name='operation' value={operation}/>
			<input type="hidden" name='_id' value={_id}/>
			<div className="field">
				<label className="label">Username</label>
				<div className="control">
					<input onChange={(event) => setUsername(event.target.value)}
						value={username}
						className="input" type="text" placeholder="Username" />
				</div>
			</div>
			<div className="field">
				<label className="label">Password</label>
				<div className="control">
					<input onChange={(event) => setPassword(event.target.value)}
					value={password} className="input" type="password" placeholder="Password" />
				</div>
			</div>
			<div className="field">
				<label className="label">Email</label>
				<div className="control">
					<input onChange={(event) => setEmail(event.target.value)}
					value={email} className="input" type="email" placeholder="Email" />
				</div>
			</div>
			<div className="field">
				<label className="label">Age</label>
				<div className="control">
					<input onChange={(event) => setAge(event.target.value)}
					value={age} className="input" type="number" placeholder="Age" />
				</div>
			</div>

			<div className="field">
				<div className="control">
					<button className="button is-primary">Submit</button>
				</div>
			</div>
		</form>
	)
}

export default AdduserForm;