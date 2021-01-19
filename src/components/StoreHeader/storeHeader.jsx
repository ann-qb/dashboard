import styled from 'styled-components';
import Logo from '../../assets/Images/logo_white.png';
import ProfilePic from '../../assets/Images/profilePic_small.png';
import DropdownMenu from '../Header/DropdownMenu'
import SubCategoryDropdown from './SubCategoryDropdown'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { SignalCellularNull } from '@material-ui/icons';



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
	height: fit-content;
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
`;
const BottomNavigation = styled.div`
	position:relative;
	display: flex;
	align-items: center;
	height: 40px;
	width: 100%;
	padding: 25px;
	background-color: #d6dcf9; ;
`;

const CategoryLinkWrapper = styled.div`
	display:flex;
	align-items:center;
	width:fit-content;
	height:100%;
	margin-right: 30px;
`;

const CategoryLinks = styled.p`
	cursor: pointer;
	color:#000;
`;



export default function StoreHeader(props) {
	const history = useHistory()
	const [subCategoryData, setSubCategoryData] = useState(null)
	const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false)

	const openSubCategoryDropdown = (e)=>{
		setSubCategoryData(e.target.id)
		setSubCategoryDropdownOpen(true)
	}
	const closeSubCategoryDropdown = () => {
		setSubCategoryData(null);
		setSubCategoryDropdownOpen(false);
	};

		const dropdownActions = (e) => {
			const clickedDiv = e.target.closest('div');
			if (clickedDiv.id === 'users') {
				history.push('/users');
			} 
		};
	
	return (
		<>
			<TopNavigation>
				<LogoWrapper>
					<LogoImage src={Logo} />
				</LogoWrapper>
				<SearchWrapper>
					<SearchInput type="text" />
					<SearchOutlinedIcon style={searchIcon} />
				</SearchWrapper>
				<ProfileWrapper>
					<ProfilePicBox />

					<DropdownMenu menuHeader="Thejus" role="USER" action={dropdownActions} page="store" />
				</ProfileWrapper>
				<CartWrapper>
					<ShoppingCartOutlinedIcon />
				</CartWrapper>
			</TopNavigation>
			<BottomNavigation onMouseLeave={closeSubCategoryDropdown}>
				<CategoryLinkWrapper>
					<CategoryLinks id="all" onMouseEnter={closeSubCategoryDropdown}>
						All
					</CategoryLinks>
				</CategoryLinkWrapper>
				<CategoryLinkWrapper>
					<CategoryLinks id="cloths" onMouseEnter={openSubCategoryDropdown}>
						Cloths
					</CategoryLinks>
				</CategoryLinkWrapper>
				<CategoryLinkWrapper>
					<CategoryLinks id="food" onMouseEnter={openSubCategoryDropdown}>
						Food
					</CategoryLinks>
				</CategoryLinkWrapper>
				<CategoryLinkWrapper>
					<CategoryLinks id="medicines" onMouseEnter={openSubCategoryDropdown}>
						Medicines
					</CategoryLinks>
				</CategoryLinkWrapper>
				{subCategoryDropdownOpen ? <SubCategoryDropdown categoryData={subCategoryData} /> : null}
			</BottomNavigation>
		</>
	);
}
