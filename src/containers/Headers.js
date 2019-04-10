

import React from 'react'
import { Navbar } from 'react-bootstrap'
import image from '../../public/img_1.png';

export class Headers extends React.PureComponent{
  render() {
    return (
      <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={image}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {'Product Page'}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">USER</a>
          </Navbar.Text>
        </Navbar.Collapse>

      </Navbar>
    </>
    )
  }
}