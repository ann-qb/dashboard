import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/Images/logo_icon.png';
import { onLogout } from '../../slices/login.slice';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

/**---------------- Styles ------------------*/
const NavBar = styled.div`
	top: 0;
	left: 0;
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
	margin-bottom: 20px;
`;

const LogoImage = styled.img`
	height: 40px;
	width: auto;
`;

export default function SideNavigation(props) {
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		let currentSelectedLink = document.querySelector('.activeNavLink');
		currentSelectedLink.classList.remove('activeNavLink');
		try {
			document.querySelector(`#${props.parentPage}`).classList.add('activeNavLink');
		} catch {
			console.log('No item exist with that id');
		}
	}, );

	const changePageRoute = (e) => {
		const clickedDiv = e.target.closest('div');
		if (clickedDiv.id === 'dashboard') history.push('/dashboard');
		else if (clickedDiv.id === 'users') history.push('/users');
		else if (clickedDiv.id === 'categories') history.push('/categories');
		else if (clickedDiv.id === 'add_products') history.push('/addProducts');
		else if (clickedDiv.id === 'store') history.push('/store');
	};

	return (
		<NavBar>
			<LogoContainer className="blackFont">
				<LogoImage src={Logo} />
				<h3>Oddy</h3>
			</LogoContainer>
			<div style={{ marginLeft: '10px' }}>
				<SubTittles className="navigationText">MENU</SubTittles>

				<NavLinksDiv id="dashboard" className="navLinks activeNavLink" onClick={changePageRoute}>
					<DashboardOutlinedIcon style={iconStyle} />
					<p className="navigationText">Dashboard</p>
				</NavLinksDiv>

				<NavLinksDiv id="store" className="navLinks" onClick={changePageRoute}>
					<DashboardOutlinedIcon style={iconStyle} />
					<p className="navigationText">Store</p>
				</NavLinksDiv>

				<NavLinksDiv id="users" className="navLinks" onClick={changePageRoute}>
					<PeopleAltOutlinedIcon style={iconStyle} />
					<p className="navigationText">Users</p>
				</NavLinksDiv>

				<NavLinksDiv id="categories" className="navLinks" onClick={changePageRoute}>
					<CategoryIcon style={iconStyle} />
					<p className="navigationText">Categories</p>
				</NavLinksDiv>

				<NavLinksDiv id="add_products" className="navLinks" onClick={changePageRoute}>
					<AddIcon style={iconStyle} />
					<p className="navigationText">Products</p>
				</NavLinksDiv>

				<SubTittles className="navigationText">UTILITY</SubTittles>

				<NavLinksDiv className="navLinks" onClick={changePageRoute}>
					<ion-icon style={iconStyle} name="settings-outline"></ion-icon>
					<p className="navigationText ">Settings</p>
				</NavLinksDiv>
				<NavLinksDiv
					className="navLinks"
					onClick={(e) => {
						changePageRoute(e);
					}}
				>
					<ion-icon style={iconStyle} name="earth-outline"></ion-icon>
					<p className="navigationText ">Contact Us</p>
				</NavLinksDiv>
			</div>
		</NavBar>
	);
}
//<ion-icon class="navIcons" style={iconStyle} name="people-outline"></ion-icon>