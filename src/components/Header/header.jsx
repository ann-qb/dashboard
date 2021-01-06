import styled from 'styled-components';
import Logo from '../../assets/Images/logo_black.png';

/**---------------- Styles ------------------*/
const HeaderBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 8vh;
	width: 100%;
	background-color: #fff;
	box-shadow: 10px 1px 10px rgba(0, 0, 0, 0.2);
`;

const LogoText = styled.p`
	margin-left: 30px;
	font-family: 'Poppins', sans-serif;
`;

const ActionDiv = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	margin-right: 10px;
	padding: 0 10px;
`;

const iconStyle = {
	padding: '0 5px',
	fontSize: '95%',
	color: '#000',
};

const LogoImage = styled.img`
	height: 90%;
	width: auto;
`;

export default function Header(props) {
	const generateHeaderActions = () => {
		return (
			<ActionDiv>
				<p>{props.userData.firstName}</p>
				<ion-icon style={iconStyle} name="chevron-down-outline"></ion-icon>
			</ActionDiv>
		);
	};

	return (
		<HeaderBar>
			{props.userData ? <LogoText>Dashboard</LogoText> : <LogoImage src={Logo} />}
			{props.userData ? generateHeaderActions() : null}
		</HeaderBar>
	);
}

// <LogoText>Dashboard</LogoText>
