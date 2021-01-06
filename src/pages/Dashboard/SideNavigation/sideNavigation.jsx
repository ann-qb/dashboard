import styled from 'styled-components';
import Logo from '../../../Assets/Images/logo_black.png'

/**---------------- Styles ------------------*/
const NavBar = styled.div`
	width: 15vw;
	height: 100vh;
	padding-top: 10px;
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
	fontSize: '115%',
	marginRight: '10px',
	color: '#74788d',
};

const LogoImage = styled.img`
	height: 40px;
	width: auto;
`;

export default function SideNavigation(props) {
	const changeSelection = (e) => {
		const clickedDiv = e.target.closest('div');
		let currentSelectedLink = document.querySelector('.activeNavLink');
		currentSelectedLink.classList.remove('activeNavLink');

		clickedDiv.classList.add('activeNavLink');
	};

	return (
		<NavBar>
			<LogoImage src={Logo}/>
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

