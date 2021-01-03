import './App.css';

// import DisplayMessage from './pages/Login/DisplayMessage';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import LoginPage from './pages/Login';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';

function App() {
	return (
		<div>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route path={'/'} exact>
						<LoginPage />
					</Route>
					<Route path={'/login'}>
						<LoginPage />
					</Route>
					<Route path={'/dashboard'}>
						<DashboardPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
