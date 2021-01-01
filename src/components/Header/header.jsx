import styled from 'styled-components'

export default function Header(props){

  const HeaderBar = styled.div`
    display:flex;
		height: 8vh;
		background-color: #fff;
		width: 100%;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
    justify-content: space-between;
    align-items:center;
  `;
  
  const LogoText = styled.p`
		margin-left: 30px;
		font-family: 'Poppins', sans-serif;
	`;

  return (
		<HeaderBar>
			<LogoText>Dashboard</LogoText>
		</HeaderBar>
	);
}