import styled from 'styled-components';
import UserCard from './UserCard';
import {useState} from 'react'
import ShowIfAuth from '../../../components/ShowIfAuth';
import AlertPopup from '../../../components/Popups/AlertPopups';
import EditPopup from '../../../components/Popups/EditPopup';

/**---------------- Styles ------------------*/
const PageContainer = styled.div`
	padding: 15px;
	height:90vh;
	overflow:scroll;
`;
const AddButton = styled.button`
	margin: 15px 0;
`;

const UserCardHeadWrapper = styled.div`
	display: flex;
	width: 100%;
	margin: 8px 0;
	padding: 0 10px;
	// background-color: #fff;
`;

const UserCardHeaders = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const HeaderTab = styled.div`
	width:25%;
`

const EmptyDivToCompensateProfilePic = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 30px;
`;

export default function UserPage(props) {
	const [alertDisplay, setAlertDisplay] = useState(false);
	const [addUserPopup, setAddUserPopup] = useState(false)

	const createCards = () => {
		return (
			<>
				<UserCard role="ADMIN" />
				<UserCard role="user" />
				<UserCard role="user" />
				<UserCard role="user" />

			</>
		);
	};

	const openAddUserPopup = ()=>{
		setAddUserPopup(true)
	}

	const closeAddUserPopup =()=>{
		setAddUserPopup(false)
	}

	const showAlertPopup = () => {
		setAlertDisplay(true);
		setAddUserPopup(false);
	};

	// Additional function to be written wherever AlertPopup component is used
	if(alertDisplay){
		setTimeout(() => {
			setAlertDisplay(false)
		}, 5000);
	}

	return (
		<PageContainer>
			<AlertPopup alertType="success" message="User Added Successfully" display={alertDisplay} />
			<p className="pageHeaders blackFont">Users</p>
			<ShowIfAuth role="ADMIN">
				<AddButton className="button-primary" onClick={openAddUserPopup}>
					+ Add Users
				</AddButton>
			</ShowIfAuth>

			<UserCardHeadWrapper>
				<UserCardHeaders>
					<HeaderTab>
						<p className="blackFont">User</p>
					</HeaderTab>
					<HeaderTab>
						<p className="blackFont">Email</p>
					</HeaderTab>
					<HeaderTab>
						<p className="blackFont">Status</p>
					</HeaderTab>
				</UserCardHeaders>

				<ShowIfAuth role="ADMIN">
					<p className="blackFont">Actions</p>
				</ShowIfAuth>
			</UserCardHeadWrapper>

			{createCards()}

			<EditPopup isOpen={addUserPopup} onRequestClose={closeAddUserPopup} onSubmit={showAlertPopup} />
		</PageContainer>
	);
}
