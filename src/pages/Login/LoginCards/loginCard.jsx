import { useState } from 'react';
import styled from 'styled-components';
import PasswordField from '../PasswordField';

//------------- Styles --------------//
const Card = styled.div`
	width: 30%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const SubmitButton = styled.button`
	margin: 10px 0 5px 0;
`;

const Input = styled.input`
	margin: 10px 0 5px 0;
	height: 30px;
	display: block;
	width: 100%;
`;

const AlertText = styled.p`
	font-size: 80%;
`;

const ErrorText = styled.p`
	font-size: 80%;
	color: #f46a6a;
`;

/** Expected props
 * --------------------
 * cardHeader
 * cardType (password, text, number, new password)
 * buttonText
 */
export default function LoginCard(props) {
	//------------- State --------------//
	const [fieldValue, setFieldValue] = useState('');

	//------------- Methods --------------//
	const setValue = (e) => {
		setFieldValue(e.target.value);
	};

	if (props.errorMessage) {
		var errorField = {
			border: '1px solid #f46a6a',
		};
		var passwordError = true;
	} else {
		var errorField = null;
		var passwordError = false;
	}

	return (
		<Card className="cards">
			<p>{props.cardHeader}</p>
			<FieldMaker {...{ ...props, fieldValue, setValue, errorField, passwordError }} />
			<ErrorText>{props.errorMessage}</ErrorText>
			<SubmitButton className="button-primary" onClick={() => props.onSubmit(props.cardHeader, fieldValue)}>
				{props.buttonText}
			</SubmitButton>
		</Card>
	);
}

const FieldMaker = (props) => {
	if (props.cardType === 'password' || props.cardType === 'new password') {
		return (
			<>
				<PasswordField
					margin="10px 0 5px 0"
					height="30px"
					value={props.fieldValue}
					onChange={props.setValue}
					isError={props.passwordError}
				/>
				{props.cardType === 'new password' ? (
					<AlertText>Make sure to re check the password before submitting</AlertText>
				) : null}
			</>
		);
	} else {
		return <Input style={props.errorField} type={props.cardType} value={props.fieldValue} onChange={props.setValue} />;
	}
};
