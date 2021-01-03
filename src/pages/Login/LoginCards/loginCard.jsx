import { useState } from 'react';
import styled from 'styled-components';
import PasswordField from '../PasswordField';

/** Expected props
 * --------------------
 * cardHeader
 * cardType (password, text, number, new password)
 * buttonText
 */

export default function LoginCard(props){
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

	//------------- Methods --------------//
	const fieldMaker = () => {
		if (props.cardType === 'password' || props.cardType === 'new password') {
			return <PasswordField margin="10px 0 5px 0" height="30px" />;
		} else {
			return <Input type={props.cardType} />;
		}
	};

	return (
		<Card className="cards">
			<p>{props.cardHeader}</p>
			{fieldMaker()}
			{props.cardType === 'new password' ? (
				<AlertText>Make sure to re check the password before submitting</AlertText>
			) : null}
			<SubmitButton className="button-primary">{props.buttonText}</SubmitButton>
		</Card>
	);
};


