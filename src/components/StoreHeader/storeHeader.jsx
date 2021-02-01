import styled from 'styled-components';
import Logo from '../../assets/Images/logo_white.png';
import ProfilePic from '../../assets/Images/profilePic_small.png';
import DropdownMenu from '../Header/DropdownMenu';
import SubCategoryDropdown from './SubCategoryDropdown';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../../slices/login.slice';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { onGetCategoryList } from './../../slices/categorylist.slice';

const useStyles = makeStyles(() => ({
	root: {
		'& .MuiBadge-colorPrimary': {
			backgroundColor: '#f46a6a',
		},
	},
}));

const TopNavigation = styled.div`
	display: flex;
	align-items: center;
	height: 60px;
	width: 100%;
	padding: 0 25px;
	background-color: #5673e8; ;
`;

const LogoWrapper = styled.div`
	width: 10%;
	height: fit-content;
`;
const LogoImage = styled.img`
	height: 40px;
	width: auto;
	cursor: pointer;
`;
const SearchWrapper = styled.div`
	position: relative;
	width: 50%;
	height: 65%;
	border-radius: 5px;
	background-color: #fff;
`;
const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	border: none;
`;
const searchIcon = {
	position: 'absolute',
	right: '1%',
	top: '50%',
	transform: 'translate(-50%,-50%)',
};
const ProfileWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 10%;
	height: 100%;
	margin-right: 0;
	margin-left: auto;
	color: #fff;
`;
const ProfilePicBox = styled.div`
	height: 30px;
	width: 30px;
	background-image: url(${ProfilePic});
	background-position: center;
	background-size: cover;
	border-radius: 50%;
	margin-right: 10px;
`;
const CartWrapper = styled.div`
	width: fit-content;
	height: fit-content;
	padding: 5px;
	margin-right: 0;
	color: #fff;
	cursor: pointer !important;
`;
const BottomNavigation = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	height: 40px;
	width: 100%;
	padding: 25px;
	background-color: #fff;
	border-bottom: 1px solid #eee;
`;

const CategoryLinkWrapper = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
	height: 100%;
	margin-right: 30px;
`;

const CategoryLinks = styled.p`
	cursor: pointer;
	// color: #000;
	transition: all 0.2s ease;
	&:hover {
		color: #5673e8;
	}
`;

const DrawerDataWrapper = styled.div`
	width: 300px;
	// height: 100%;
	padding: 10px 20px;
`;
const CategoryNameWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const CategoryLink = styled.p`
	font-size: 110%;
	cursor: pointer;
	&:hover {
		color: #5673e8;
	}
`;

const SubCategoryLink = styled.p`
	margin-left: 10px;
	padding: 5px 0;
	cursor: pointer;
	&:hover {
		color: #5673e8;
	}
`;

function DrawerData(props) {
	const history = useHistory();
	const [drawerSubCategoryOpen, setDrawerSubCategoryOpen] = useState(false);

	const openSubCategoryCollapsible = () => {
		setDrawerSubCategoryOpen(!drawerSubCategoryOpen);
	};

	const redirectToCategoriesPage = (e) => {
		const subCategory = e.target.innerHTML;
		history.push(`/store-category?category=${props.data.name}&subCategory=${subCategory}`);
	};

	return (
		<DrawerDataWrapper>
			{props.data.Subcategories.length === 0 ? (
				<CategoryNameWrapper>
					<CategoryLink onClick={redirectToCategoriesPage}>{props.data.name}</CategoryLink>
				</CategoryNameWrapper>
			) : (
				<>
					<CategoryNameWrapper>
						<p style={{ fontSize: '110%' }}>{props.data.name}</p>
						<IconButton aria-label="expand row" size="small" onClick={openSubCategoryCollapsible}>
							{drawerSubCategoryOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</CategoryNameWrapper>
					<Collapse in={drawerSubCategoryOpen} timeout="auto" unmountOnExit>
						{props.data.Subcategories.map((each) => (
							<SubCategoryLink onClick={redirectToCategoriesPage}>{each.name}</SubCategoryLink>
						))}
					</Collapse>
				</>
			)}
		</DrawerDataWrapper>
	);
}

export default function StoreHeader(props) {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const { loggedUser } = useSelector((state) => state.loginSlice);
	const { categoryList } = useSelector((state) => state.categoryListSlice);
	const location = useLocation();
	useEffect(() => {
		if (categoryList.length === 0) {
			dispatch(onGetCategoryList());
		}
	}, []);
	const useQuery = () => {
		return new URLSearchParams(location.search);
	};
	let query = useQuery();

	// Query data
	const search = query.get('search');
	console.log(search);
	useEffect(() => {
		if (search === null) {
			setSearchTerm('');
		}
	}, [search]);
	const { role } = useSelector((state) => state.loginSlice);
	const [openAllCategoryDrawer, setOpenAllCategoryDrawer] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const [productsInCart, setProductsInCart] = useState(0);
	const [subCategoryData, setSubCategoryData] = useState({ category: '', subCategories: [] });
	const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState({ open: false, id: null });
	const [searchTerm, setSearchTerm] = useState(search !== null ? search : '');

	useEffect(() => {
		try {
			const productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
			console.log(productsInCart);
			if (loggedUser.email === productsInCart.user) {
				setProductsInCart(productsInCart.numberOfProducts);
			} else {
				setProductsInCart(null);
			}
		} catch {
			setProductsInCart(null);
		}
	}, [props.itemsInCart]);

	// Master back button (logo button)
	const backToHome = () => {
		history.push('/store');
	};

	// For sub category drop-down
	const openSubCategoryDropdown = (e) => {
		const selectedCategory = categoryList.find((category) => category.name === e.target.id);
		setSubCategoryData({ category: selectedCategory.name, subCategories: selectedCategory.Subcategories });
		setSubCategoryDropdownOpen({ open: true, id: e.target.id });
	};
	const closeSubCategoryDropdown = () => {
		setSubCategoryData({ category: '', subCategories: [] });
		setSubCategoryDropdownOpen({ open: false, id: null });
	};

	const dropdownActions = (e) => {
		const clickedDiv = e.target.closest('div');
		if (clickedDiv.id === 'dashboard') {
			history.push('/dashboard');
		} else if (clickedDiv.id === 'users') {
			history.push('/users');
		} else if (clickedDiv.id === 'logOut') {
			dispatch(onLogout());
		} else if (clickedDiv.id === 'profile') {
			history.push('/profile');
		}
	};

	// For All category drawer
	const toggleDrawer = (open) => (e) => {
		setOpenAllCategoryDrawer({ ...openAllCategoryDrawer, left: open });
	};

	const redirectToCategoriesPage = (e) => {
		history.push(`/store-category?category=${e.target.id}`);
	};

	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const keyPress = (e) => {
		if (e.key === 'Enter') {
			console.log('enter pressed');
			if (searchTerm.trim().length !== 0) {
				history.push(`/store-category?search=${searchTerm.trim()}`);
			}
		}
	};

	return (
		<>
			<TopNavigation>
				<LogoWrapper>
					<LogoImage src={Logo} onClick={backToHome} />
				</LogoWrapper>
				<SearchWrapper>
					<SearchInput type="text" value={searchTerm} onChange={handleSearchTermChange} onKeyDown={keyPress} />
					<SearchOutlinedIcon style={searchIcon} />
				</SearchWrapper>
				<ProfileWrapper>
					<ProfilePicBox />

					<DropdownMenu menuHeader={loggedUser.firstname} role={role} action={dropdownActions} page="store" />
				</ProfileWrapper>
				<CartWrapper onClick={() => alert('Hi')}>
					<Badge badgeContent={productsInCart} color="primary" className={classes.root}>
						<ShoppingCartOutlinedIcon />
					</Badge>
				</CartWrapper>
			</TopNavigation>

			<BottomNavigation onMouseLeave={closeSubCategoryDropdown}>
				<CategoryLinkWrapper>
					<CategoryLinks id="all" onMouseEnter={closeSubCategoryDropdown} onClick={toggleDrawer(true)}>
						All
					</CategoryLinks>
					<Drawer anchor="left" open={openAllCategoryDrawer.left} onClose={toggleDrawer(false)}>
						<p style={{ fontWeight: '500', fontSize: '120%', padding: '15px' }}>All Categories</p>
						<hr style={{ border: '1px solid #eee' }} />
						{categoryList.map((each) => (
							<DrawerData key={each.id + each.name} data={each} />
						))}
					</Drawer>
				</CategoryLinkWrapper>

				{categoryList
					.filter((category) => category.Subcategories.length !== 0)
					.map((category) => {
						let colorOfLink;
						subCategoryDropdownOpen.open && subCategoryDropdownOpen.id === category.name
							? (colorOfLink = '#5673E8')
							: (colorOfLink = '#000');
						return (
							<CategoryLinkWrapper key={category.id}>
								<CategoryLinks
									style={{ color: colorOfLink }}
									id={category.name}
									onMouseEnter={(e) => (category.Subcategories.length === 0 ? null : openSubCategoryDropdown(e))}>
									{category.name}
								</CategoryLinks>
								{subCategoryDropdownOpen.open && subCategoryDropdownOpen.id === category.name ? (
									<SubCategoryDropdown subCategoryData={subCategoryData} />
								) : null}
							</CategoryLinkWrapper>
						);
					})}
			</BottomNavigation>
		</>
	);
}
