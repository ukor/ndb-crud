import React, { useState } from 'react'
import axios from 'axios';
import { useSnackbar } from 'notistack';

function AdduserForm() {

	const { enqueueSnackbar } = useSnackbar();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [age, setAge] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			// add to database
			let resp = await axios.post('/api/users', {
				username, email, password, age
			});
			const { data } = resp;
			if (data.type === 'error') throw new Error(data.message);

			enqueueSnackbar(data.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'left' } } )

			// empty form values
			setUsername('');
			setPassword('');
			setEmail('');
			setAge('');
		} catch (exception) {
			console.log(exception);
			enqueueSnackbar(exception.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'left' } })
		}
	}

	return (
		<form onSubmit={handleSubmit} >
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