import styled from 'styled-components';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import ShowIfAuth from '../../../components/ShowIfAuth';
import AlertPopup from '../../../components/Popups/AlertPopups';
import EditPopup from '../../../components/Popups/EditPopup';
import { onGetUserList } from '../../../slices/userlist.slice';
import { useDispatch, useSelector } from 'react-redux';

/**---------------- Styles ------------------*/
const PageContainer = styled.div`
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;
const AddButton = styled.button`
	margin-top: 15px;
`;

const UserCardHeadWrapper = styled.div`
	display: flex;
	width: 100%;
	margin: 8px 0;
	margin-top: 15px;
	padding: 0 10px;
	// background-color: #fff;
`;

const UserCardHeaders = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const HeaderTab = styled.div`
	width: 25%;
`;

const EmptyDivToCompensateProfilePic = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 30px;
`;

export default function UserPage(props) {
	const [alertDisplay, setAlertDisplay] = useState(false);
	const [addUserPopup, setAddUserPopup] = useState(false);

	const { userList } = useSelector((state) => state.userListSlice);
	const dispatch = useDispatch();
	useEffect(() => dispatch(onGetUserList()), []);

	const createCards = () => {
		return (
			<>
				{userList.map((each) => (
					<UserCard key={each.id} data={each} />
				))}
				{/* <UserCard />
				<UserCard />
				<UserCard />
				<UserCard /> */}
			</>
		);
	};

	const openAddUserPopup = () => {
		setAddUserPopup(true);
	};

	const closeAddUserPopup = () => {
		setAddUserPopup(false);
	};

	const showAlertPopup = () => {
		setAlertDisplay(true);
		setAddUserPopup(false);
	};

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}

	return (
		<PageContainer>
			<AlertPopup alertType="success" message="User Added Successfully" display={alertDisplay} />
			<p className="pageHeaders blackFont">Users</p>
			<ShowIfAuth allowedRoles={['admin']}>
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

				<ShowIfAuth allowedRoles={['admin']}>
					<p className="blackFont">Actions</p>
				</ShowIfAuth>
			</UserCardHeadWrapper>

			{createCards()}

			<EditPopup isOpen={addUserPopup} onRequestClose={closeAddUserPopup} onSubmit={showAlertPopup} />
		</PageContainer>
	);
}
