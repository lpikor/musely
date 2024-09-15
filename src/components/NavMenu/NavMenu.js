import NavItem from './NavItem/NavItem';
import './NavMenu.css';
import { FaHome, FaLocationArrow, FaUser } from "react-icons/fa";

function NavMenu() {
	return (
		<div className="nav-menu">
			<ul className="nav-list">
				<NavItem href="/"><FaHome /></NavItem>
				<NavItem href="/locations"><FaLocationArrow /></NavItem>
				<NavItem href="/profile"><FaUser /></NavItem>
			</ul>
		</div>
	);
}

export default NavMenu;