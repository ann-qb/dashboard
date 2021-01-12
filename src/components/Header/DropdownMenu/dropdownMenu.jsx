import styled from 'styled-components';
import { useState } from 'react';

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
`;

const DroppedContent = styled.div`
	position: absolute;
	z-index: 1;
	right: 0;
	left: auto;
	width: 190px;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
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

	return (
		<DropdownWrapper onClick={toggleDropdown}>
			<HeaderWrapper>
				<DropdownHeadText>{props.menuHeader}</DropdownHeadText>
				{isOpen ? <ion-icon name="chevron-up-outline"></ion-icon> : <ion-icon name="chevron-down-outline"></ion-icon>}
			</HeaderWrapper>
			{isOpen && props.role !== 'ADMIN' ? (
				<DroppedContent>
					<DroppedButtonWrapper id="profile" onClick={props.action}>
						<ion-icon style={{ marginRight: '8px' }} name="person-outline"></ion-icon>
						<p>Profile</p>
					</DroppedButtonWrapper>
					<DroppedButtonWrapper id="logOut" onClick={props.action}>
						<ion-icon style={{ marginRight: '8px' }} name="log-out-outline"></ion-icon>
						<p>Log Out</p>
					</DroppedButtonWrapper>
				</DroppedContent>
			) : isOpen ? (
				<DroppedContent>
					<DroppedButtonWrapper id="logOut" onClick={props.action}>
						<ion-icon style={{ marginRight: '8px' }} name="log-out-outline"></ion-icon>
						<p>Log Out</p>
					</DroppedButtonWrapper>
				</DroppedContent>
			) : null}
		</DropdownWrapper>
	);
}
