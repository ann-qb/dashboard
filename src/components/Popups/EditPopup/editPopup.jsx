import Modal from 'react-modal';
import styled from 'styled-components';

/**---------------- Styles ------------------*/
const SuperFieldWrapper = styled.div`
	display: flex;
	width: 100%;
`;

const SubFieldWrapper = styled.div`
	width: 50%;
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
`;

export default function EditModal(props) {
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
					<SingleFieldGroup>
						<p>First name</p>
						<Input type="text" />
					</SingleFieldGroup>
					<SingleFieldGroup>
						<p>Last name</p>
						<Input type="text" />
					</SingleFieldGroup>
				</SubFieldWrapper>

				<SubFieldWrapper>
					<SingleFieldGroup>
						<p>Email</p>
						<Input type="text" />
					</SingleFieldGroup>
					<SingleFieldGroup>
						<p>Status</p>
						<Input type="text" />
					</SingleFieldGroup>
				</SubFieldWrapper>
			</SuperFieldWrapper>

			<ButtonWrapper>
				<button style={{ marginRight: '10px' }} className="button-secondary" onClick={props.onRequestClose}>
					Cancel
				</button>
				<button style={{ marginLeft: '10px' }} className="button-primary">
					Submit
				</button>
			</ButtonWrapper>
		</Modal>
	);
}
