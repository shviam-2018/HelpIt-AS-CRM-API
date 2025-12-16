import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="hamburger-container">
      <button
        className={`hamburger-button ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <div className="hamburger-overlay" onClick={closeMenu}></div>
      )}

      <nav className={`hamburger-menu ${isOpen ? "open" : ""}`}>
        <h3>HelpIt CRM</h3>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
          onClick={closeMenu}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
          onClick={closeMenu}
        >
          Create Case
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
          onClick={closeMenu}
        >
          Search Case
        </NavLink>
        <NavLink
          to="/display"
          className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
          onClick={closeMenu}
        >
          Display Cases
        </NavLink>
        <NavLink
          to="/update"
          className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
          onClick={closeMenu}
        >
          Update Case
        </NavLink>
        <NavLink
          to="/delete"
          className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
          onClick={closeMenu}
        >
          Delete Case
        </NavLink>
      </nav>
    </div>
  );
}
