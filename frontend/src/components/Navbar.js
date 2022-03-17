import {Navbar} from 'react-bootstrap';

const NavbarApp = () => {

  return (
    <Navbar bg="danger" style={{padding: '8px 5px'}} sticky={'top'}>
      <Navbar.Brand href="#" style={{color: '#ffffff', fontWeight: 'bold'}}>
        React Test App
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavbarApp;
