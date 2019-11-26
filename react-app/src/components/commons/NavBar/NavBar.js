
import React from 'react';
import { Navbar } from 'react-bootstrap';
import './NavBar.css';
import { ReactComponent as Logo } from '../../../assets/gs_icon.svg';
import { ReactComponent as Logout } from '../../../assets/logout.svg';
import { Link } from 'react-router-dom';

const CommonNavBar = () => {
    const logoutHandler = () => {
        localStorage.removeItem('token')
    }
    return (
        <Navbar>
            <Navbar.Brand >
                <Link to="/home">
                    <Logo />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Link onClick={() => logoutHandler()} to="/login">
                        <div className="logout">
                            <div className="logoutText"><strong>Log out</strong></div>
                            <div className="logoutIcon"><Logout /></div>
                        </div>
                    </Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CommonNavBar;