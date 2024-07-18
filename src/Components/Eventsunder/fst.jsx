function NavBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">D&C Event manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Fine Events</Nav.Link>
            <Nav.Link href="#link">Create Event</Nav.Link>
            <NavDropdown title="Help Center" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Help Center</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact your event organizer</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href="#home">Log In</Nav.Link>
            <Nav.Link href="#home">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;