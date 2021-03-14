import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../firebase';
import { faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';
const Header = () => {
  const isAuth = useSelector(state => state.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    auth.signOut();
    dispatch(logout());
  };

  const defaultNav = (
    <>
      <LinkContainer to='/login'>
        <Nav.Link>
          <FontAwesomeIcon icon={faUser} /> &nbsp; Login
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/register'>
        <Nav.Link>
          <FontAwesomeIcon icon={faUserPlus} /> &nbsp; Register
        </Nav.Link>
      </LinkContainer>
    </>
  );

  const authNav = (
    <>
      <Nav.Link>
        <FontAwesomeIcon icon={faUser} /> &nbsp;{' '}
        {isAuth?.email && isAuth.email.split('@')[0]}
      </Nav.Link>

      <Nav.Link onClick={logoutHandler}>
        <FontAwesomeIcon icon={faUserPlus} /> &nbsp; Logout
      </Nav.Link>
    </>
  );
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Cloudsbay</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {isAuth ? authNav : defaultNav}
            {/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
