import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { onAddUser, onEditUser } from '../../../slices/userlist.slice';

/**---------------- Styles ------------------*/
const SuperFieldWrapper = styled.div`
	width: 100%;
`;

const SubFieldWrapper = styled.div`
	width: 100%;
	display: flex;
`;

const SingleFieldGroup = styled.div`
	width: 100%;
	margin-bottom: 10px;

	padding: 0 5px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	width: fit-content;
	margin: 10px auto 0 auto;
`;

const Input = styled.input`
	width: 100%;
	height: 30px;
	margin-top: 5px;
`;

const Select = styled.select`
	width: 100%;
	height: 30px;
	margin-top: 5px; ;
`;

export default function EditModal(props) {
	const dispatch = useDispatch();
	const { role } = useSelector((state) => state.loginSlice);

	const userObj = {
		firstname: props?.data?.firstname || '',
		lastname: props?.data?.lastname || '',
		status: props?.data?.status || 'pending',
		email: props?.data?.email || '',
	};

	const [userData, setUserData] = useState({ ...userObj });
	const [firstnameError, setFirstnameError] = useState('');
	const [lastnameError, setLastnameError] = useState('');
	const [emailError, setEmailError] = useState('');

	const handleInputChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	let selectDisabled;
	if (role !== 'admin') selectDisabled = true;
	else selectDisabled = false;

	const cancelEdit = () => {
		setUserData(userObj);
		setFirstnameError('');
		setLastnameError('');
		setEmailError('');
	};

	const validateData = () => {
		const emailPattern = new RegExp('^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$', 'g');
		let errorFlag = false;
		if (userData.firstname?.trim().length === 0) {
			setFirstnameError('This field is required');
			errorFlag = true;
		} else {
			setFirstnameError('');
		}
		if (userData.lastname?.trim().length === 0) {
			setLastnameError('This field is required');
			errorFlag = true;
		} else {
			setLastnameError('');
		}
		if (!userData.email?.match(emailPattern)) {
			setEmailError('Please enter a valid email id');
			errorFlag = true;
		} else {
			setEmailError('');
		}
		if (!errorFlag) {
			// dispatch
			if (props.data) {
				if (props.editSelf) {
					dispatch(onEditUser({ userData: { ...userData } }));
				} else {
					// edit user
					dispatch(onEditUser({ userData: { ...userData }, id: props.data.id }));
				}
			} else {
				// add user
				dispatch(onAddUser({ userData: { ...userData } }));
				setUserData(userObj);
			}
			setUserData(userObj);
		}
	};
	const modalStyle = {
		overlay: {},
		content: {
			top: '50%',
			left: '50%',
			height: 'fit-content',
			width: '500px',
			border: 'none',
			boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.19)',
			transform: 'translate(-50%,-50%)',
		},
	};
	console.log('Modal called');
	return (
		<Modal style={modalStyle} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
			<SuperFieldWrapper>
				<SubFieldWrapper>
					<SingleFieldGroup style={{ marginRight: '10px' }}>
						<p>First name</p>
						<Input type="text" name="firstname" value={userData.firstname} onChange={handleInputChange} autoFocus />
						<p>{firstnameError}</p>
					</SingleFieldGroup>
					<SingleFieldGroup>
						<p>Last name</p>
						<Input type="text" name="lastname" value={userData.lastname} onChange={handleInputChange} />
						<p>{lastnameError}</p>
					</SingleFieldGroup>
				</SubFieldWrapper>

				<SubFieldWrapper>
					<SingleFieldGroup style={{ marginRight: '10px' }}>
						<p>Email</p>
						<Input type="email" name="email" value={userData.email} onChange={handleInputChange} />
						<p>{emailError}</p>
					</SingleFieldGroup>
					<SingleFieldGroup>
						<p>Status</p>
						<Select
							name="status"
							id="status_dropdown"
							value={userData.status}
							onChange={handleInputChange}
							disabled={selectDisabled}>
							{props.data && props.data.status !== 'pending' ? (
								<>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</>
							) : (
								<option value="pending">Pending</option>
							)}
						</Select>
					</SingleFieldGroup>
				</SubFieldWrapper>
			</SuperFieldWrapper>

			<ButtonWrapper>
				<button
					style={{ marginRight: '10px' }}
					className="button-secondary"
					onClick={() => {
						cancelEdit();
						props.onRequestClose();
					}}>
					Cancel
				</button>
				<button
					style={{ marginLeft: '10px' }}
					className="button-primary"
					onClick={() => {
						validateData();
						//props.onRequestClose();
						//props.onSubmit();
					}}>
					Submit
				</button>
			</ButtonWrapper>
		</Modal>
	);
}
