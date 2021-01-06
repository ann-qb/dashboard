import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePic from '../../Assets/Images/profilePic_small.png'


/**---------------- Styles ------------------*/
const HeaderBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70px;
	width: 100%;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
`;

const LogoText = styled.p`
	margin-left: 30px;
	font-family: 'Poppins', sans-serif;
`;

const ActionDiv = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	margin-right: 10px;
	padding: 0 10px;
`;

const iconStyle = {
	padding: '0 5px',
	fontSize: '70%',
	color: '#000',
};


const SearchBox = styled.div`
display:flex;
	width: 25%;
	height: 100%;
	padding: 10px 15px;
	// background-color: #00ff00;
`;
const SearchInput = styled.input`
	border: none;
	width:100%;
`;
const searchIconStyle = {
	paddingTop: '5px',
	fontSize: '110%',
	color: '#74788d',
};

const ProfilePicBox = styled.div`
	height: 30px;
	width: 30px;
	background-image: url(${ProfilePic});
	background-position:center;
	background-size:cover;
	border-radius:50%;
	margin-right:10px;
`;


export default function Header(props) {
	const generateHeaderActions = () => {
		return (
			<ActionDiv>
				<ProfilePicBox />
				<p>{props.userData.firstName}</p>
				<ion-icon style={iconStyle} name="chevron-down-outline"></ion-icon>
			</ActionDiv>
		);
	};

	return (
		<HeaderBar>
			<SearchBox>
				<span style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
					<FontAwesomeIcon style={{ color: '#74788d' }} icon="search" />
				</span>

				<SearchInput type="text" placeholder="Search..." />
			</SearchBox>
			{props.userData ? generateHeaderActions() : null}
		</HeaderBar>
	);
}

