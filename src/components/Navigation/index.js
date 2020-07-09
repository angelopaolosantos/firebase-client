import React from 'react'
import { Link } from 'react-router-dom'

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'
import { AuthUserContext } from '../Session'

import { Navbar, Nav } from 'rsuite'

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => 
            authUser ? (
                <NavigationAuth authUser={authUser} />
             ) : (
                <NavigationNonAuth />
             )
        }
    </AuthUserContext.Consumer>
    
)

const navbarLogoStyle = {
    padding: "18px 20px",
    display: "inline-block"
}

const NavigationAuth = ({ authUser }) => ( 
    <Navbar>
        <Navbar.Header>
            <Link to={ROUTES.LANDING} style={navbarLogoStyle}>Uneek Jewelry</Link>
        </Navbar.Header>
        <Navbar.Body>
            <Nav>
                <Nav.Item componentClass={Link} to={ROUTES.LANDING}>
                    Landing
                </Nav.Item>
                <Nav.Item componentClass={Link} to={ROUTES.HOME}>
                    Home
                </Nav.Item>
                <Nav.Item componentClass={Link} to={ROUTES.ACCOUNT}>
                    Account
                </Nav.Item>
                {!!authUser.roles[ROLES.ADMIN] && (
                <Nav.Item componentClass={Link} to={ROUTES.ADMIN}>
                    Admin
                </Nav.Item>
                )}
        </Nav>
        <Nav pullRight>
            <SignOutButton />
        </Nav>
        </Navbar.Body>
    </Navbar>    
)

const NavigationNonAuth = () => (
    <Navbar>
        <Navbar.Header>
            <a href={ROUTES.LANDING} style={navbarLogoStyle}>Uneek Jewelry</a>
        </Navbar.Header>
        <Navbar.Body>
            <Nav>
                <Nav.Item componentClass={Link} to={ROUTES.LANDING}>
                    Landing
                </Nav.Item>
            </Nav>
            <Nav pullRight>
                <Nav.Item componentClass={Link} to={ROUTES.SIGN_IN}>
                    Sign In
                </Nav.Item>
            </Nav>
        </Navbar.Body>
    </Navbar>    
)

export default Navigation