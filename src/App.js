import './App.css';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import styled from 'styled-components'
import PasswordCard from './components/Password'

function App() {

	return (
		<div>
      <GlobalStyle />
     <PasswordCard/>
		</div>
	);
}

export default App;
