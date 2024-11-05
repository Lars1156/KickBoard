import React from "react";
import { Navbar, Container, Button } from 'react-bootstrap';

function KickboardNavbar () {
    return(
        <>
             <Navbar bg="light" expand="lg">
              <Container>
                    <Navbar.Brand href="#home">Kickbord</Navbar.Brand>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                     <Navbar.Collapse className="justify-content-end">
                         <Button variant="primary">Login</Button>
                    </Navbar.Collapse>
              </Container>
           </Navbar>
        </>
    )
}

export default KickboardNavbar;