import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authenContext'; // Adjust path as necessary
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLoginClick = () => {
    navigate('/authen');
  };

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      logout();
      navigate('/');
    }
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">D&C Event Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="https://www.eventbrite.com/d">Fine Events</Nav.Link>
            <Nav.Link 
              href="#link"
              className={isAuthenticated ? '' : 'disabled'}
              onClick={() => isAuthenticated ? navigate('/create-event') : null}
            >
              Create Event
            </Nav.Link>
            <NavDropdown title="Help Center" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Help Center</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact your event organizer</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            {isAuthenticated ? (
              <>
                <Nav.Link onClick={() => navigate('/profile')}>Hello, {user?.full_name}</Nav.Link>
                <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLoginClick}>LogIn/Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
