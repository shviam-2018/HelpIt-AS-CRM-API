import { NavLink } from "react-router-dom";
import "../index.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">HelpIt CRM</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Dashboard</NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Create Case</NavLink>
        <NavLink to="/display" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Display Cases</NavLink>
        <NavLink to="/update" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Update Case</NavLink>
        <NavLink to="/delete" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Delete Case</NavLink>
      </nav>
    </aside>
  );
}
