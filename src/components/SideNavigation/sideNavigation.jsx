import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/Images/logo_icon.png';
import ShowIfAuth from '../../components/ShowIfAuth';
import { onLogout } from '../../slices/login.slice';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import CategoryIcon from '@material-ui/icons/Category';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import { makeStyles } from '@material-ui/core/styles';

/**---------------- Styles ------------------*/
const useStyles = makeStyles(() => ({
	icons: {
		fontSize: '115%',
		marginRight: '10px',
		color: '#9398a4',
		'&:hover': {
			color: '#5673E8',
		},
	},
}));

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
	const classes = useStyles();
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
	});

	const changePageRoute = (e) => {
		const clickedDiv = e.target.closest('div');
		if (clickedDiv.id === 'dashboard') history.push('/dashboard');
		else if (clickedDiv.id === 'users') history.push('/users');
		else if (clickedDiv.id === 'categories') history.push('/categories');
		else if (clickedDiv.id === 'add_products') history.push('/productListing');
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

				<NavLinksDiv id="store" className="navLinks activeNavLink" onClick={changePageRoute}>
					<StoreMallDirectoryOutlinedIcon className={classes.icons} />
					<p className="navigationText">Store</p>
				</NavLinksDiv>

				<ShowIfAuth allowedRoles={['admin']}>
					<NavLinksDiv id="dashboard" className="navLinks" onClick={changePageRoute}>
						<DashboardOutlinedIcon className={classes.icons} />
						<p className="navigationText">Dashboard</p>
					</NavLinksDiv>
				</ShowIfAuth>

				<NavLinksDiv id="users" className="navLinks" onClick={changePageRoute}>
					<PeopleAltOutlinedIcon className={classes.icons} />
					<p className="navigationText">Users</p>
				</NavLinksDiv>

				<ShowIfAuth allowedRoles={['admin']}>
					<NavLinksDiv id="categories" className="navLinks" onClick={changePageRoute}>
						<CategoryIcon className={classes.icons} />
						<p className="navigationText">Categories</p>
					</NavLinksDiv>

					<NavLinksDiv id="add_products" className="navLinks" onClick={changePageRoute}>
						<LocalMallOutlinedIcon className={classes.icons} />
						<p className="navigationText">Products</p>
					</NavLinksDiv>
				</ShowIfAuth>

				<SubTittles className="navigationText">UTILITY</SubTittles>

				<NavLinksDiv className="navLinks" onClick={changePageRoute}>
					<SettingsOutlinedIcon className={classes.icons} />
					<p className="navigationText ">Settings</p>
				</NavLinksDiv>
				<NavLinksDiv
					className="navLinks"
					onClick={(e) => {
						changePageRoute(e);
					}}
				>
					<PhoneInTalkOutlinedIcon className={classes.icons} />
					<p className="navigationText ">Contact Us</p>
				</NavLinksDiv>
			</div>
		</NavBar>
	);
}
