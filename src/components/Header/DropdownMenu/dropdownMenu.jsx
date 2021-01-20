import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const DropdownWrapper = styled.div`
	position: relative;
	display: inline-block;
	align-items: center;
	height: 100%;
	text-align: right;
	width: fit-content;
	cursor: pointer;
`;

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`;
const DropdownHeadText = styled.p`
	margin-right: 5px;
	text-transform: capitalize;
`;

const DroppedContent = styled.div`
	position: absolute;
	z-index: 1;
	right: 0;
	left: auto;
	width: 190px;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
	color: #74788d;
`;

const DroppedButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 5px 10px;
	cursor: pointer;

	&:hover {
		background-color: #f3f8fb;
	}
`;

export default function Dropdown(props) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	useEffect(() => {
		const closeDropDown = () => {
			setIsOpen(false);
		};
		if (isOpen) {
			setTimeout(() => {
				window.addEventListener('click', closeDropDown);
			}, 0);
		}
		return () => {
			window.removeEventListener('click', closeDropDown);
		};
	}, [isOpen]);

	const MenuItems = () => {
		if (props.page === 'store') {
			if (isOpen && props.role !== 'admin') {
				return (
					<DroppedContent>
						<DroppedButtonWrapper id="profile" onClick={props.action}>
							<PermIdentityOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Profile</p>
						</DroppedButtonWrapper>
						<DroppedButtonWrapper id="users" onClick={props.action}>
							<PeopleAltOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Users</p>
						</DroppedButtonWrapper>
						<DroppedButtonWrapper id="logOut" onClick={props.action}>
							<ExitToAppOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Log Out</p>
						</DroppedButtonWrapper>
					</DroppedContent>
				);
			} else if (isOpen) {
				return (
					<DroppedContent>
						<DroppedButtonWrapper id="users" onClick={props.action}>
							<PeopleAltOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Users</p>
						</DroppedButtonWrapper>
						<DroppedButtonWrapper id="logOut" onClick={props.action}>
							<ExitToAppOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Log Out</p>
						</DroppedButtonWrapper>
					</DroppedContent>
				);
			} else {
				return null;
			}
		} else {
			if (isOpen && props.role !== 'admin'){
				return (
					<DroppedContent>
						<DroppedButtonWrapper id="profile" onClick={props.action}>
							<PermIdentityOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Profile</p>
						</DroppedButtonWrapper>
						<DroppedButtonWrapper id="logOut" onClick={props.action}>
							<ExitToAppOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Log Out</p>
						</DroppedButtonWrapper>
					</DroppedContent>
				);
			}
			else if(isOpen){
				return (
					<DroppedContent>
						<DroppedButtonWrapper id="logOut" onClick={props.action}>
							<ExitToAppOutlinedIcon style={{ marginRight: '8px' }} />
							<p>Log Out</p>
						</DroppedButtonWrapper>
					</DroppedContent>
				);
			}
			else{
				return(null)
			}
		}
	};

	return (
		<DropdownWrapper onClick={toggleDropdown}>
			<HeaderWrapper>
				<DropdownHeadText>{props.menuHeader}</DropdownHeadText>
				{isOpen ? <ion-icon name="chevron-up-outline"></ion-icon> : <ion-icon name="chevron-down-outline"></ion-icon>}
			</HeaderWrapper>
			<MenuItems/>
		</DropdownWrapper>
	);
}
