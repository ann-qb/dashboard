import { useState } from 'react';
import styled from 'styled-components';
import PasswordField from '../PasswordField';
import Logo from '../../../Assets/Images/logo_black.png';

//------------- Styles --------------//
const Card = styled.div`
	position: absolute;
	top: 45%;
	left: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 350px;
	padding: 15px 20px !important;
	text-align: center;
	transform: translate(-50%, -50%);
`;

const SubmitButton = styled.button`
	margin-right: 0;
`;

const Input = styled.input`
	display: block;
	height: 40px;
	width: 100%;
	margin: 20px 0 5px 0;
`;

const AlertText = styled.p`
	font-size: 80%;
`;

const ErrorText = styled.p`
	font-size: 80%;
	color: #f46a6a;
`;

const StyledLogo = styled.img`
	width: 90px;
	height: auto;
	text-align: center;
`;

const ButtonHolder = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: 10px;
`;

const SideLink = styled.p`
	color: #5673e8;
	cursor: pointer;
	font-size: 80%;
`;

/** Expected props
 * --------------------
 * cardHeader
 * cardType (password, text, number, new password)
 * buttonText
 * sideButton text
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
			<span>
				<StyledLogo src={Logo} />
			</span>

			{props.cardType !== 'new password' ? (
				<>
					<p style={{ fontSize: '150%', marginTop: '10px' }}>Log In</p>
					<p style={{ fontSize: '85%' }}>to continue</p>
				</>
			) : (
				<p style={{ fontSize: '150%', marginTop: '10px' }}>Create Password</p>
			)}

			<FieldMaker {...{ ...props, fieldValue, setValue, errorField, passwordError }} />
			<ErrorText>{props.errorMessage}</ErrorText>
			<ButtonHolder>
				<SideLink>{props.sideLinkText}</SideLink>
				<SubmitButton className="button-primary" onClick={() => props.onSubmit(props.cardHeader, fieldValue)}>
					{props.buttonText}
				</SubmitButton>
			</ButtonHolder>
		</Card>
	);
}

const FieldMaker = (props) => {
	if (props.cardType === 'password' || props.cardType === 'new password') {
		return (
			<>
				<PasswordField
					margin="10px 0 5px 0"
					height="40px"
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
		return (
			<Input
				style={props.errorField}
				type={props.cardType}
				value={props.fieldValue}
				onChange={props.setValue}
				placeholder={props.cardHeader}
			/>
		);
	}
};

/**
 * 
 * <Card className="cards">
			<p>{props.cardHeader}</p>
			<FieldMaker {...{ ...props, fieldValue, setValue, errorField, passwordError }} />
			<ErrorText>{props.errorMessage}</ErrorText>
			<SubmitButton className="button-primary" onClick={() => props.onSubmit(props.cardHeader, fieldValue)}>
				{props.buttonText}
			</SubmitButton>
		</Card>
 */
