import styled from 'styled-components';
import { useState } from 'react';
import CreateNewPassword from '../../../components/Popups/CreateNewPassword';
import EditPopup from '../../../components/Popups/EditPopup';
import ProfilePic from '../../../assets/Images/profilePic_large.png';

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
	font-size: 110%;
	color: #000;
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
	padding: 25px;
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
`;
const iconStyle = {
	cursor: 'pointer',
};

export default function ProfilePage(props) {
	const [createPassIsOpen, setCreatePassIsOpen] = useState(false);
	const [editDetailsIsOpen, setEditDetailsIsOpen] = useState(false);

	const openCreatePasswordModal = () => {
		setCreatePassIsOpen(true);
  };
  
  const editDetailsModal = ()=>{
    setEditDetailsIsOpen(true)
  }

	return (
		<PageContainer>
			<p className="pageHeaders blackFont">Profile</p>
			<ProfileCardWrapper>
				<ProfileDetailsWrapper className="cards">
					<PictureAreaWrapper>
						<ProfilePicContainer />
						<RoleText>User</RoleText>
					</PictureAreaWrapper>

					<DetailsAreaWrapper>
						<DetailsLabel>
							<p>Name</p>
							<ion-icon style={iconStyle} name="pencil-outline" onClick={editDetailsModal}></ion-icon>
						</DetailsLabel>
						<DetailsText>Firstname Lastname</DetailsText>

						<DetailsLabel>
							<p>Email</p>
							<ion-icon name="pencil-outline"></ion-icon>
						</DetailsLabel>
						<DetailsText>email@email.com</DetailsText>

						<DetailsLabel>
							<p>Status</p>
						</DetailsLabel>
						<DetailsText>status</DetailsText>
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
      <EditPopup isOpen={editDetailsIsOpen} onRequestClose={()=>{setEditDetailsIsOpen(false)}} role='USER'/>
		</PageContainer>
	);
}

/**
 * <ProfileActionWrapper className="cards">
					<p>Change Password</p>
					<SeparationLine />
					<PasswordFieldsWrapper>
						<PasswordFieldContainer style={{ marginRight: '10px' }}>
							<p style={{ marginBottom: '-15px' }}>Old Password</p>
							<PasswordField onChange={() => null} id="new_password" />
						</PasswordFieldContainer>
						<PasswordFieldContainer style={{ marginLeft: '10px' }}>
							<p style={{ marginBottom: '-15px' }}>New Password</p>
							<PasswordField onChange={() => null} id="new_password" />
						</PasswordFieldContainer>
					</PasswordFieldsWrapper>
				</ProfileActionWrapper>
 */
