import './App.css';

// import DisplayMessage from './pages/Login/DisplayMessage';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import styled from 'styled-components';
import LoginPage from './pages/Login';
import Card from './pages/Login/DisplayMessage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

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
					<Route path={'/dashboard'}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
