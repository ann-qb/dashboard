import './App.css';

// import DisplayMessage from './pages/Login/DisplayMessage';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import styled from 'styled-components'
import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'



function App() {

	return (
		<div>
      <GlobalStyle />
      <DashboardPage/>
		</div>
	);
}


export default App;
