import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import logo from "../Images/logo1.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";
import {
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaPlusCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserAlt, FaUsersCog } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.users.user);

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      color="light"
      light
      expand="md"
      className="px-4 py-2 shadow-sm header"
    >
      <NavbarBrand tag={Link} to="/" className="d-flex align-items-center">
        <img
          src={logo}
          alt="Eventify Logo"
          style={{ width: "110px", marginRight: "12px" }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "4.5rem",
              color: "green",
              lineHeight: "1.2",
            }}
          >
            Eventify
          </span>
          <span
            style={{
              fontSize: "1.05rem",
              fontWeight: "500",
              color: "#007bff",
              marginTop: "2px",
            }}
          >
            Make Every Moment Special
          </span>
        </div>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ms-auto d-flex align-items-center">
          <NavItem>
            <NavLink
              tag={Link}
              to="/"
              className="d-flex align-items-center gap-1 text-success"
            >
              <FaHome /> Home
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              tag={Link}
              to="/addEvent"
              className="d-flex align-items-center gap-1 text-success"
            >
              <FaPlusCircle /> Add Event
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/books"
              className="d-flex align-items-center gap-1 text-success"
            >
              <FaCalendarCheck /> Bookings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/profile"
              className="d-flex align-items-center gap-1 text-success"
            >
              <FaUser /> Profile
            </NavLink>
          </NavItem>
          {user.userType === "admin" && (
            <NavItem>
              <NavLink
                tag={Link}
                to="/manage"
                className="d-flex align-items-center gap-1 text-success"
              >
                <FaUsersCog /> Manage
              </NavLink>
            </NavItem>
          )}

          <NavItem>
            <NavLink
              onClick={handleLogout}
              className="d-flex align-items-center gap-1 text-dark"
              style={{ cursor: "pointer" }}
            >
              <FaSignOutAlt /> Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
