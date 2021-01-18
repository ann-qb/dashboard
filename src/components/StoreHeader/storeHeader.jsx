import styled from 'styled-components';
import Logo from '../../assets/Images/logo_white.png';
import ProfilePic from '../../assets/Images/profilePic_small.png';
import { useState } from 'react';

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
	display: flex;
	align-items: center;
	height: 40px;
	width: 100%;
	padding: 25px;
	background-color: #d6dcf9; ;
`;

const UL = styled.ul`
	list-styling: none;
`;
const LI = styled.li`
	display: inline-block;
	margin-right: 30px;
	color: #000;
`;
const CategoryLinks = styled.p`
	cursor: pointer;
`;

export default function StoreHeader(props) {
	const [allAnchorEl, setAllAnchorEl] = useState(null)
	const [clothsAnchorEl, setClothsAnchorEl] = useState(null)
	const [medicinesAnchorEl, setMedicinesAnchorEl] = useState(null);
	const [foodAnchorEl, setFoodAnchorEl] = useState(null);
	const [electronicsAnchorEl, setElectronicsAnchorEl] = useState(null);
	
	const handleClick = (event) => {
		setAllAnchorEl(null);
		setClothsAnchorEl(clothsAnchorEl ? null : event.currentTarget);
		setMedicinesAnchorEl(null)
		setFoodAnchorEl(null)
		setElectronicsAnchorEl(null)
	};

	const allOpen = Boolean(allAnchorEl);
	const clothsOpen = Boolean(clothsAnchorEl);
	const id = allOpen || clothsOpen ? 'simple-popper' : undefined;

	
	// const id = clothsOpen ? 'simple-popper' : undefined;
	
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
					<p style={{ textTransform: 'capitalize' }}>Thejus</p>
				</ProfileWrapper>
				<CartWrapper>
					<ShoppingCartOutlinedIcon />
				</CartWrapper>
			</TopNavigation>
			<BottomNavigation>
				<UL>
					<LI>
						<CategoryLinks onClick={handleClick}>All</CategoryLinks>
						<Popper id={id} open={allOpen} anchorEl={allAnchorEl}>
							<div>The content of the Popper.</div>
						</Popper>
					</LI>
					<LI>
						<CategoryLinks onClick={handleClick}>Cloths</CategoryLinks>
						<Popper id={id} open={clothsOpen} anchorEl={clothsAnchorEl}>
							<div>The content of the Popper.</div>
						</Popper>
					</LI>
					<LI>
						<CategoryLinks>Medicines</CategoryLinks>
					</LI>
					<LI>
						<CategoryLinks>Food</CategoryLinks>
					</LI>
					<LI>
						<CategoryLinks>Electronics</CategoryLinks>
					</LI>
				</UL>
			</BottomNavigation>
		</>
	);
}
