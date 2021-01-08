import styled from 'styled-components';
import Logo from '../../../assets/Images/logo_icon.png';

/**---------------- Styles ------------------*/
const NavBar = styled.div`
	top:0;
	left:0;
	width: 270px;
	height: 100vh;
	padding-top: 10px;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
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
	color: '#9398a4',
};

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom:20px;
`;

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
			<LogoContainer className="blackFont">
				<LogoImage src={Logo} />
				<h3>Oddy</h3>
			</LogoContainer>
			<div style={{marginLeft:'10px'}}>
				<SubTittles className="navigationText">MENU</SubTittles>

				<NavLinksDiv className="navLinks activeNavLink" onClick={changeSelection}>
					<ion-icon class="navIcons" style={iconStyle} name="clipboard-outline"></ion-icon>
					<p className="navigationText">Dashboard</p>
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

