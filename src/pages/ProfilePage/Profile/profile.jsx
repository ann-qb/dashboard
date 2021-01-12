import styled from 'styled-components';
import { useState } from 'react';
import CreateNewPassword from '../../../components/Popups/CreateNewPassword';
import EditPopup from '../../../components/Popups/EditPopup';
import ProfilePic from '../../../assets/Images/profilePic_large.png';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AlertPopup from '../../../components/Popups/AlertPopups';
import { useHistory } from 'react-router-dom';

const PageContainer = styled.div`
	padding: 25px;
	height: 90vh;
	overflow: scroll;
`;

const ProfileCardWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	// height:95%;
	margin-top: 20px;
`;

const RoleText = styled.p`
	width: fit-content;
	margin: 10px auto;
	text-transform: capitalize;
`;
const NameText = styled.p`
	width: fit-content;
	margin: 10px auto;
	font-size: 110%;
	color: #000;
	text-transform: capitalize;
`;
const SeparationLine = styled.hr`
	border: 1px solid #dcdde2;
	margin: 15px 0;
`;

const ProfileDetailsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-contents: center;
	width: 100%;
	// width: 32%;
	// height: 100%;
	padding: 25px !important;
`;

const ProfilePicContainer = styled.div`
	width: 100px;
	height: 100px;
	margin: 0 auto;
	border-radius: 50%;
	background-image: url(${ProfilePic});
	background-position: center;
	background-size: cover;
`;
const PictureAreaWrapper = styled.div`
	width: 300px;
	padding: 10px;
`;
const DetailsAreaWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	margin-left: 25px;
	padding: 10px;
`;
const DetailsLabel = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 5px;
`;
const DetailsText = styled.p`
	color: #000;
	font-size: 110%;
	margin-bottom: 20px;
	text-transform: capitalize;
`;
const iconStyle = {
	color: '#000',
	cursor: 'pointer',
};

export default function ProfilePage() {
	const [createPassIsOpen, setCreatePassIsOpen] = useState(false);
	const [editDetailsIsOpen, setEditDetailsIsOpen] = useState(false);

	const { loggedUser, role } = useSelector((state) => state.loginSlice);
	const { status } = useSelector((state) => state.userListSlice);
	useEffect(() => {
		if (status === 'edit user success') {
			setAlertType('success');
			setAlertMessage('User profile updated successfully!');
			setAlertDisplay(true);
		} else if (status === 'edit user failed') {
			setAlertType('error');
			setAlertMessage('Could not update user profile');
			setAlertDisplay(true);
		} else if (status === 'change password success') {
			setAlertType('success');
			setAlertMessage('Updated password successfully!');
			setAlertDisplay(true);
		} else if (status === 'change password failed') {
			setAlertType('error');
			setAlertMessage('Could not update password');
			setAlertDisplay(true);
		} else if (status === 'old password was wrong') {
			setAlertType('error');
			setAlertMessage('Could not update password. The current password entered was incorrect.');
			setAlertDisplay(true);
		}
	}, [status]);

	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}

	const openCreatePasswordModal = () => {
		setCreatePassIsOpen(true);
	};

	const editDetailsModal = () => {
		setEditDetailsIsOpen(true);
	};
	console.log('Prp');
	console.log(useHistory());
	return (
		<PageContainer>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />
			<p className="pageHeaders blackFont">Profile</p>
			<ProfileCardWrapper>
				<ProfileDetailsWrapper className="cards">
					<PictureAreaWrapper>
						<ProfilePicContainer />
						<NameText>{loggedUser.firstname}</NameText>
						<RoleText>{role}</RoleText>
					</PictureAreaWrapper>

					<DetailsAreaWrapper>
						<DetailsLabel>
							<p>Name</p>
							<ion-icon style={iconStyle} name="pencil-outline" onClick={editDetailsModal}></ion-icon>
						</DetailsLabel>
						<DetailsText>{loggedUser.firstname + ' ' + loggedUser.lastname}</DetailsText>

						<DetailsLabel>
							<p>Email</p>
						</DetailsLabel>
						<DetailsText style={{ textTransform: 'none' }}>{loggedUser.email}</DetailsText>

						{/* Kinda redundant - pending and inactive users can't see it
						Admins won't edit it for themselves
						Users can't edit it */}
						<DetailsLabel>
							<p>Mobile</p>
						</DetailsLabel>
						<DetailsText>9874563201</DetailsText>
						<button className="button-primary" onClick={openCreatePasswordModal}>
							Change password
						</button>
					</DetailsAreaWrapper>
				</ProfileDetailsWrapper>
			</ProfileCardWrapper>

			<CreateNewPassword
				open={createPassIsOpen}
				close={() => {
					setCreatePassIsOpen(false);
				}}
			/>
			<EditPopup
				isOpen={editDetailsIsOpen}
				onRequestClose={() => {
					setEditDetailsIsOpen(false);
				}}
				data={loggedUser}
				editSelf={true}
				title="Edit Profile"
			/>
		</PageContainer>
	);
}
