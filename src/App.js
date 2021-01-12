import './App.css';
import './components/Icons/icons';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import SetPasswordPage from './pages/SetPasswordPage';

function App() {
	return (
		<div>
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
					<PrivateRoute path="/profile">
						<ProfilePage />
					</PrivateRoute>
					<PrivateRoute path="/errorpage">
						<ErrorPage errorType="404" />
					</PrivateRoute>
					<Redirect to="/errorpage" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
