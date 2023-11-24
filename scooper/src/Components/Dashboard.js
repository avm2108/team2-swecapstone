import React, { useState } from 'react';
import { Nav, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import {Image} from 'react-bootstrap'
import adminImage from '../Images/admin.jpg';

const Dashboard = () => {
    
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
    

  return (
    <>
      {!showSidebar && (
        <FontAwesomeIcon
          icon={faBars}
          onClick={toggleSidebar}
          className="sidebar-toggle top-left"
        />
      )}
  
  <Col
  sm={showSidebar ? 3 : 0}
  md={2}
  className={`text-light sidebar font-Style ${
    showSidebar ? 'show' : 'hide'
  }`}
>
  <div className="sidebar d-flex align-items-end ">
    {showSidebar && (
      <FontAwesomeIcon
        icon={faTimes}
        onClick={toggleSidebar}
        className="close-icon"
      />
    )}
  </div>

  <Nav className="flex-column d-flex align-items-center" style={{height: '87vh'}}>
    <Nav.Link href="#">
      <div>
        <Image src={adminImage} width={30} height={30} roundedCircle />
        &nbsp; &nbsp;
        <span>Administrator</span>
      </div>
    </Nav.Link>
    <Nav.Link href="#">
      <span>Dismissal Dashboard</span>
    </Nav.Link>
    <Nav.Link href="#">
      <span>Add Student</span>
    </Nav.Link>
    <Nav.Link href="#">
      <span>View Students</span>
    </Nav.Link>
    <Nav.Link href="#">
      <span>Release Scheduling</span>
    </Nav.Link>
    <Nav.Link href="#">
      <span>Log Out</span>
    </Nav.Link>
  </Nav>
</Col>

    </>
  );

}

export default Dashboard;