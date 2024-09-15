import { NavLink } from 'react-router-dom';
import './NavItem.css';

function NavItem({ href, children }) {

	return (
		<li className="nav-item">
			<a className="link" href={href}>{children}</a>
		</li>
	);
}

export default NavItem;