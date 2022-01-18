import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

// Import Authentication function
import requireAuth from './utils/requireAuth';
import AppNavBar from './utils/NavBar';
import LoginModal from '../src/components/auth/LoginModal';
import RegisterModal from '../src/components/auth/RegisterModal';
import LandingPage from '../src/utils/LandingPage';
import Blogs from './components/BlogComponent/Blogs';
import CreateBlog from './components/BlogComponent/CreateBlog';

const App = (props) => {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<div style={{ position: 'sticky', top: '0px', zIndex: 5 }}>
						<AppNavBar />
					</div>
					<div>
						<Route path='/' exact component={requireAuth(LandingPage, false)} />
						<Route path='/signup' exact component={requireAuth(RegisterModal, false)} />
						<Route path='/login' exact component={requireAuth(LoginModal, false)} />

						<Route path='/blog/create' exact component={requireAuth(CreateBlog, true)} />
						<Route path='/blogs' exact component={requireAuth(Blogs, false)} />
					</div>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
