import styled from 'styled-components';

export default function Header(props) {
	const HeaderBar = styled.div`
		display: flex;
		height: 8vh;
		background-color: #fff;
		width: 100%;
		box-shadow: 10px 1px 10px rgba(0, 0, 0, 0.2);
		justify-content: space-between;
		align-items: center;
	`;

	const LogoText = styled.p`
		margin-left: 30px;
		font-family: 'Poppins', sans-serif;
	`;

	const ActionDiv = styled.div`
		display: flex;
		padding: 0 10px;
		margin-right: 10px;
		height: 100%;
		align-items: center;
	`;
	const iconStyle = {
		color: '#000',
		fontSize: '95%',
		padding: '0 5px',
	};

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
