import { useState, useEffect } from 'react';
import styled from 'styled-components';

/** Expected props
 * ------------------------
 * width
 * margin
 * height
 */

export default function PasswordField(props) {
	//------------- Styles --------------//
	const InputField = styled.input`
		width: 100%;
		height: 100%;
	`;

	const InputDiv = styled.div`
		position: relative;
		width: ${props.width};
		height: ${props.height};
		margin: ${props.margin};
		margin-top: 20px;
	`;

	const eyeIconStyle = {
		position: 'absolute',
		top: '50%',
		right: '5px',
		color: '#000',
		transform: 'translate(-50%,-50%)',
		cursor: 'pointer',
	};

	//------------- States --------------//
	const [passwordShown, setPasswordShown] = useState(false);
	const [fieldContent, setFieldContent] = useState(props.fieldValue);

	//------------- Methods --------------//
	let fieldId;
	if (props.id) fieldId = props.id;
	else fieldId = 'passwordInputField';

	useEffect(() => {
		setFieldContent(null);
	}, [props.id]);

	const changePasswordState = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const saveFieldContent = (e) => {
		// Doesn't work without this
		let field = document.querySelector(`#${fieldId}`);
		setFieldContent(field.value);
		// Why is this not enough?
		props.onChange(e);
	};

	const changeInputBorderOnFocus = (e) => {
		const field = e.target;
		field.style.border = '1px solid #5673E8';
	};

	const changeInputBorderOnBlur = (e) => {
		const field = e.target;
		field.style.border = '1px solid #000';
	};

	if (props.error) {
		var errorField = {
			border: '1px solid #f46a6a',
		};
	} else {
		var errorField = null;
	}

	return (
		<InputDiv>
			{passwordShown ? (
				<ion-icon style={eyeIconStyle} name="eye-outline" onClick={changePasswordState}></ion-icon>
			) : (
				<ion-icon style={eyeIconStyle} name="eye-off-outline" onClick={changePasswordState}></ion-icon>
			)}
			{console.log('Rerender')}
			{console.log('FV' + props.fieldValue)}
			{console.log('FC' + props.fieldContent)}
			<InputField
				onFocus={changeInputBorderOnFocus}
				onBlur={changeInputBorderOnBlur}
				id={fieldId}
				style={errorField}
				type={passwordShown ? 'text' : 'password'}
				value={fieldContent}
				onChange={saveFieldContent}
				placeholder="Password"
				onKeyDown={props.onKeydown}
				autoFocus
			/>
		</InputDiv>
	);
}
