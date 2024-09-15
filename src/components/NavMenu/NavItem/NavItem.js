import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavItem.css';

function NavItem({ href, children }) {
	return (
		<li className="nav-item">
			<NavLink
				to={href}
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				{children}
			</NavLink>
		</li>
	);
}

export default NavItem;
