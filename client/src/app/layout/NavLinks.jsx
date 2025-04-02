import { NavLink } from "react-router-dom";
import "./NavLinks.css";

export default function NavLinks() {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">All Users</NavLink>
      </li>
      <li>
        <NavLink to="/ul/places">My Places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Auth</NavLink>
      </li>
    </ul>
  );
}
