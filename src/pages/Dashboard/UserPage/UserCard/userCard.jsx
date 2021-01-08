import styled, { css } from 'styled-components';
import { useState } from 'react';
import ShowIfAuth from '../../../../components/ShowIfAuth';
import EditPopup from '../../../../components/Popups/EditPopup';
import DeleteConfirmPopup from '../../../../components/Popups/DeleteConfirmPopup';
import ProfilePic from '../../../../assets/Images/profilePic_small.png';

/**---------------- Styles ------------------*/
const CardContainer = styled.div`
	display: flex;
	width: 100%;

	margin: 10px 0;
	padding: 10px 10px;
	background-color: #fff;
`;

const UserTabs = styled.div`
	display: flex;
	width: 100%;

	height: 100%;
`;

const DetailsTabs = styled.div`
	display: flex;
	align-items: center;
	width: 25%;
`;

const StatusText = styled.p`
	width: fit-content;
	height: fit-content;
	padding: 2px 5px;
	font-size: 65%;
	border-radius: 5px;
	border: none;
	color: ${(props) => props.textColor};
	background-color: ${(props) => props.bgColor};
`;

const AdminTabs = styled.div`
	float: left;
	display: flex;
	align-item: center;
	justify-content: center;
`;

const editIconStyle = {
	fontSize: '120%',
	margin: '5px',
	color: '#000',
	cursor: 'pointer',
};

const deleteIconStyle = {
	fontSize: '120%',
	margin: '5px',
	color: '#f46a6a',
	cursor: 'pointer',
};

const ProfilePicHolder = styled.span`
	height: 30px;
	width: 30px;
	background-image: url(${ProfilePic});
	background-position: center;
	background-size: cover;
	border-radius: 50%;
	margin-right: 10px;
`;

export default function UserCard(props) {
	const { data } = props;

	const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
	const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);

	let bgColor, textColor;
	if (data.status === 'active') {
		[bgColor, textColor] = ['#ccf0e8', '#34c38f'];
	} else if (data.status === 'pending') {
		[bgColor, textColor] = ['#dcdde2', '#74788d'];
	} else {
		[bgColor, textColor] = ['#fcdada', '#f46a6a'];
	}

	const generateModal = (e) => {
		if (e.target.id === 'edit_icon') {
			setEditPopupIsOpen(true);
		} else if (e.target.id === 'delete_icon') {
			console.warn('Delete Modal');
			setDeletePopupIsOpen(true);
		}
	};

	const closeEditModal = () => {
		setEditPopupIsOpen(false);
	};

	const closeDeleteModal = () => {
		setDeletePopupIsOpen(false);
	};

	const CreateAdminTaskTabs = () => {
		return (
			<AdminTabs>
				<ion-icon id="edit_icon" style={editIconStyle} name="create-outline" onClick={generateModal}></ion-icon>
				<ion-icon id="delete_icon" style={deleteIconStyle} name="trash-outline" onClick={generateModal}></ion-icon>
			</AdminTabs>
		);
	};

	return (
		<CardContainer>
			<UserTabs>
				<DetailsTabs>
					<ProfilePicHolder />
					<p>{data.firstname + ' ' + data.lastname}</p>
				</DetailsTabs>
				<DetailsTabs>
					<p>{data.email}</p>
				</DetailsTabs>
				<DetailsTabs>
					<StatusText bgColor={bgColor} textColor={textColor}>
						{data.status}
					</StatusText>
				</DetailsTabs>
			</UserTabs>

			<ShowIfAuth allowedRoles={['admin']}>
				<CreateAdminTaskTabs />
			</ShowIfAuth>

			<EditPopup isOpen={editPopupIsOpen} onRequestClose={closeEditModal} data={data} />
			<DeleteConfirmPopup isOpen={deletePopupIsOpen} onRequestClose={closeDeleteModal} />
		</CardContainer>
	);
}
