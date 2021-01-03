import styled from 'styled-components';

export default function SideNavigation(props) {
	const NavBar = styled.div`
		z-index: 99;
		padding-top: 10px;
		width: 15vw;
		height: 100vh;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.19);
	`;

	const LogoText = styled.h3`
		margin: 0 0 30px 10px;
	`;

	const SubTittles = styled.p`
		margin: 10px 0 10px 10px;
		font-size: 80%;
	`;

	const NavLinksDiv = styled.div`
		display: flex;
		align-items: center;
	`;

	const iconStyle = {
		color: '#74788d',
		fontSize: '115%',
		marginRight: '10px',
	};

	const changeSelection = (e) => {
		const clickedDiv = e.target.closest('div');
		let currentSelectedLink = document.querySelector('.activeNavLink');
		currentSelectedLink.classList.remove('activeNavLink');

		clickedDiv.classList.add('activeNavLink');
	};

	return (
		<NavBar>
			<LogoText>Logo Text</LogoText>
			<div>
				<SubTittles className="navigationText">MENU</SubTittles>

				<NavLinksDiv className="navLinks activeNavLink" onClick={changeSelection}>
					<ion-icon style={iconStyle} name="people-outline"></ion-icon>
					<p className="navigationText">Users</p>
				</NavLinksDiv>

				<SubTittles className="navigationText">UTILITY</SubTittles>

				<NavLinksDiv className="navLinks" onClick={changeSelection}>
					<ion-icon style={iconStyle} name="settings-outline"></ion-icon>
					<p className="navigationText ">Settings</p>
				</NavLinksDiv>
				<NavLinksDiv className="navLinks" onClick={changeSelection}>
					<ion-icon style={iconStyle} name="log-out-outline"></ion-icon>
					<p className="navigationText ">Logout</p>
				</NavLinksDiv>
			</div>
		</NavBar>
	);
}
