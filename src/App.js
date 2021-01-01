import './App.css';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import styled from 'styled-components'
import LoginCard from './components/LoginCards'

function App() {

	return (
		<div>
			<GlobalStyle />
			<LoginCard cardHeader="Create New Password" cardType="password" buttonText='Create'/>
		</div>
	);
}


export default App;
