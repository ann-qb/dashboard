import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ShowIfAuth from '../../../../components/ShowIfAuth';
import EditPopup from '../../../../components/Popups/EditPopup';
import DeleteConfirmPopup from '../../../../components/Popups/DeleteConfirmPopup';
import ProfilePic from '../../../../assets/Images/profilePic_small.png';
import AlertPopup from '../../../../components/Popups/AlertPopups';
import { useSelector } from 'react-redux';

/**---------------- Styles ------------------*/
const CardContainer = styled.div`
	display: flex;
	width: 100%;

	margin: 10px 0;
	padding: 10px 10px;
	background-color: #fff;

	// -youbkit-touch-callout: none; 
	// -youbkit-user-select: none;   
	// -moz-user-select: none;	   
	// -ms-user-select: none;		
	// user-select: none;			
								  
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
	height:100%;
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
	width: 35px;
	background-image: url(${ProfilePic});
	background-position: center;
	background-size: cover;
	border-radius: 50%;
	margin-right: 10px;
`;

const DetailsText=styled.p`
	width:100%;
	margin-right:10px;
	overflow:scroll;
`

export default function UserCard(props) {
	const { data } = props;
	const { status } = useSelector((state) => state.userListSlice);

	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
	const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);

	useEffect(() => {
		if (editPopupIsOpen && status === 'edit user success') {
			setAlertType('success');
			setAlertMessage('User details updated successfully!');
			showAlertPopup();
		} else if (editPopupIsOpen && status === 'edit user failed') {
			setAlertType('error');
			setAlertMessage('Could not update user details');
			showAlertPopup();
		} else if (deletePopupIsOpen && status === 'delete user success') {
			setDeletePopupIsOpen(false);
		} else if (deletePopupIsOpen && status === 'delete user failed') {
			setDeletePopupIsOpen(false);
		}
	}, [editPopupIsOpen, deletePopupIsOpen, status]);

	const showAlertPopup = () => {
		setAlertDisplay(true);
		setEditPopupIsOpen(false);
	};

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}

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
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />
			<UserTabs>
				<DetailsTabs style={{ width: '30%' }}>
					<ProfilePicHolder />
					<DetailsText>{data.firstname + ' ' + data.lastname}</DetailsText>
				</DetailsTabs>
				<DetailsTabs style={{ width: '50%' }}>
					<DetailsText>{data.email}</DetailsText>
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

			<EditPopup isOpen={editPopupIsOpen} onRequestClose={closeEditModal} data={data} title="Edit User"/>
			<DeleteConfirmPopup id={data.id} isOpen={deletePopupIsOpen} onRequestClose={closeDeleteModal} />
		</CardContainer>
	);
}
//style={{ backgroundColor: '#0000ff' }}