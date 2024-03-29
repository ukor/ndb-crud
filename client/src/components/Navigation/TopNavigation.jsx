import React from 'react';

function TopNavigation() {
	return (
		<nav className="navbar is-spaced is-primary" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a href="/" className="navbar-item">
					App
				</a>
				<a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div className="navbar-menu">
				<div className="navbar-start"></div>
				<div className="navbar-end">
					<a href="/" className="navbar-item">Add User</a>
					<a href="/users" className="navbar-item">View Users</a>
				</div>
			</div>
		</nav>
	)
}

export default TopNavigation;