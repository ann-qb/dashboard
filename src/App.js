import './App.css';

// import DisplayMessage from './pages/Login/DisplayMessage';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import styled from 'styled-components'
import LoginCard from './pages/Login/LoginCards'



function App() {

	return (
		<div>
			<GlobalStyle />
			<LoginCard cardHeader="Create New Password" cardType="password" buttonText='Create'/>
		</div>
	);
}


export default App;
