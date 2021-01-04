import styled from 'styled-components';

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
			<LogoText>Dashboard</LogoText>
			{props.userData ? generateHeaderActions() : null}
		</HeaderBar>
	);
}
