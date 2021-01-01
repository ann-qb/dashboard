import './App.css';

// import DisplayMessage from './pages/Login/DisplayMessage';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import styled from 'styled-components'
import LoginPage from './pages/Login'



function App() {

	return (
		<div>
			<GlobalStyle />
      <LoginPage/>
		</div>
	);
}


export default App;
