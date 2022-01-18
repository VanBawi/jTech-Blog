import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../src/actions/authActions';
import { getUsers } from '../actions/userActions';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
	Container,
	NavbarBrand,
} from 'reactstrap';

const AppNavBar = () => {
	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authR);
	// const user = useSelector((state) => state.authR);
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const authLinks = (
		<>
			<NavItem>
				<NavLink href='/blogs'>Blogs</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/blog/create'>Add Blog</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/' onClick={() => dispatch(logout())}>
					<i className='fas fa-sign-out-alt'></i> Logout
				</NavLink>
			</NavItem>
		</>
	);

	const guestLinks = (
		<>
			<NavItem>
				<NavLink href='/signup'>Sign Up</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/login'>Login</NavLink>
			</NavItem>
		</>
	);
	// Redirect if logged in

	return (
		<Navbar style={{ backgroundColor: '#0a3d62' }} dark expand='md'>
			<Container>
				<NavbarBrand className='logoStyle' href='/'>
					jTech Blog
				</NavbarBrand>

				<NavbarToggler onClick={toggle} />

				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						{auth.token ? authLinks : guestLinks}{' '}
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

export default AppNavBar;
