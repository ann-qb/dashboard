import styled from 'styled-components';

export default function SideNavigation(props) {
	const NavBar = styled.div`
		position: absolute;
		left: 0;
		width: 15vw;
		height: 100vh;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.19);
	`;

	const LogoText = styled.h3`
		margin: 10px 0 30px 10px;
	`;

	const SubTittles = styled.p`
		margin: 10px 0 10px 10px;
		font-size: 80%;
	`;

	const changeSelection = (e) => {
		const clickedDiv = e.target.closest('div');
		let currentSelectedLink = document.querySelector('.activeNavLink');
		currentSelectedLink.classList.remove('activeNavLink');

		clickedDiv.classList.add('activeNavLink');
	};

	return (
		<NavBar>
			<LogoText>Dashboard</LogoText>
			<div>
				<SubTittles className="navigationText">Menu</SubTittles>
				<div className="navLinks activeNavLink" onClick={changeSelection}>
					<p className="navigationText">Users</p>
				</div>

				<SubTittles className="navigationText">Utility</SubTittles>
				<div className="navLinks" onClick={changeSelection}>
					<p className="navigationText ">Settings</p>
				</div>
				<div className="navLinks" onClick={changeSelection}>
					<p className="navigationText ">Logout</p>
				</div>
			</div>
		</NavBar>
	);
}
