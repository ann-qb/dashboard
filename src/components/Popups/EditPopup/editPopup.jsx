import Modal from 'react-modal';
import styled from 'styled-components';

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
	margin-top:5px;
`;

const Select = styled.select`
	width: 100%;
	height: 30px;
	margin-top: 5px;;
`;

export default function EditModal(props) {
	// Error handiling if no data props is received
	let MOCK_USER_DATA;
	if (!props.data) {
		MOCK_USER_DATA = {
			firstname: null,
			lastname: null,
			status: null,
			email: null,
		};
	} else {
		MOCK_USER_DATA = { ...props.data };
	}

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
						<Input type="text" value={MOCK_USER_DATA.firstname} autoFocus/>
					</SingleFieldGroup>
					<SingleFieldGroup>
						<p>Last name</p>
						<Input type="text" value={MOCK_USER_DATA.lastname} />
					</SingleFieldGroup>
				</SubFieldWrapper>

				<SubFieldWrapper>
					<SingleFieldGroup style={{ marginRight: '10px' }}>
						<p>Email</p>
						<Input type="email" value={MOCK_USER_DATA.email} />
					</SingleFieldGroup>
					<SingleFieldGroup>
						<p>Status</p>
						<Select name="status" id="status_dropdown">
							{props.data ? (
								<>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</>
							) : (
								<option value="active">Pending</option>
							)}
						</Select>
					</SingleFieldGroup>
				</SubFieldWrapper>
			</SuperFieldWrapper>

			<ButtonWrapper>
				<button style={{ marginRight: '10px' }} className="button-secondary" onClick={props.onRequestClose}>
					Cancel
				</button>
				<button style={{ marginLeft: '10px' }} className="button-primary" onClick={props.onSubmit}>
					Submit
				</button>
			</ButtonWrapper>
		</Modal>
	);
}
