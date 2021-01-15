import './App.css';
import './components/Icons/icons';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';
import PrivateRoute from './components/PrivateRoute';

import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import Users from './pages/Users';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import OfflinePage from './pages/OfflinePage';
import SetPasswordPage from './pages/SetPasswordPage';
import CategoriesPage from './pages/CategoriesPage';
import AddProductsPage from './pages/AddProductsPage';

function App() {
	return (
		<div>
			<Online>
				<GlobalStyle />
				<Router>
					<Switch>
						<Route path="/" exact>
							<LoginPage />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/user/set-password">
							<SetPasswordPage />
						</Route>
						<PrivateRoute exact path="/dashboard">
							<DashboardPage />
						</PrivateRoute>
						<PrivateRoute exact path="/users">
							<Users />
						</PrivateRoute>
						<PrivateRoute path="/profile">
							<ProfilePage />
						</PrivateRoute>
						<PrivateRoute path="/categories">
							<CategoriesPage />
						</PrivateRoute>
						<PrivateRoute path="/addProducts">
							<AddProductsPage />
						</PrivateRoute>
						<PrivateRoute path="/errorpage">
							<ErrorPage errorType="404" />
						</PrivateRoute>
						<Redirect to="/errorpage" />
					</Switch>
				</Router>
			</Online>
			<Offline>
				<OfflinePage />
			</Offline>
		</div>
	);
}

export default App;
