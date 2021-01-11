import styled from 'styled-components';
import PasswordField from '../../../pages/Login/PasswordField';
import Modal from 'react-modal';
import { useState } from 'react';

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
	const [oldPassword, setOldPassword] = useState('');

	const validateOldPassword = () => {
		setOldPassword('OldPass');
	};

	const uploadNewPassword = () => {
		setOldPassword(null);
		props.close();
	};

	if (oldPassword) {
		return (
			<Modal style={modalStyle} isOpen={props.open} onRequestClose={props.close}>
				<HeadText>New Password</HeadText>
				<PasswordField onChange={() => null} />
				<Button className="button-primary" onClick={uploadNewPassword}>
					Save
				</Button>
			</Modal>
		);
	} else {
		return (
			<Modal style={modalStyle} isOpen={props.open}>
				<HeadText>Current Password</HeadText>
				<PasswordField onChange={() => null} />
				<Button className="button-primary" onClick={validateOldPassword}>
					Next
				</Button>
			</Modal>
		);
	}
}
