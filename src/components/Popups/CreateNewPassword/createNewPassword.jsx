import styled from 'styled-components';
import PasswordField from '../../../pages/Login/PasswordField';
import Modal from 'react-modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onChangePassword } from '../../../slices/userlist.slice';

const modalStyle = {
	overlay: {},
	content: {
		top: '50%',
		left: '50%',
		height: 'fit-content',
		width: '300px',
		border: 'none',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.19)',
		transform: 'translate(-50%,-50%)',
	},
};

const HeadText = styled.p`
	color: #000;
	font-size: 110%;
`;
const Button = styled.button`
	margin-top: 25px;
	width: 100%;
`;

export default function CreateNewPassword(props) {
	const dispatch = useDispatch();
	const [oldPasswordEntered, setOldPasswordEntered] = useState(false);
	let newPassword;
	const [oldPassword, setOldPassword] = useState('');

	const validateOldPassword = () => {
		setOldPassword(document.querySelector('#old_pass').value);
		setOldPasswordEntered(true);
	};

	const uploadNewPassword = () => {
		newPassword = document.querySelector('#new_pass').value;
		console.log(newPassword);
		dispatch(onChangePassword({ oldPassword, newPassword }));
		setOldPasswordEntered(false);
		props.close();
	};

	const closeModal = () => {
		setOldPasswordEntered(false);
		props.close();
	};

	if (oldPasswordEntered) {
		return (
			<Modal style={modalStyle} isOpen={props.open} onRequestClose={closeModal}>
				<HeadText>New Password</HeadText>
				<PasswordField id="new_pass" onChange={() => null} />
				<Button className="button-primary" onClick={uploadNewPassword}>
					Save
				</Button>
			</Modal>
		);
	} else {
		return (
			<Modal style={modalStyle} isOpen={props.open} onRequestClose={closeModal}>
				<HeadText>Current Password</HeadText>
				<PasswordField id="old_pass" onChange={() => null} />
				<Button className="button-primary" onClick={validateOldPassword}>
					Next
				</Button>
			</Modal>
		);
	}
}
