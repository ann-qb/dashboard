import { useState } from 'react';
import styled from 'styled-components';

/** Expected props 
 * ------------------------
 * width
 * margin
 * height
*/

const PasswordField = (props) => {

  //------------- Styles --------------//
	const InputField = styled.input`
		width: 100%;
		height: 100%;
	`;

	const InputDiv = styled.div`
		position: relative;
		width: ${props.width};
    margin: ${props.margin};
    height:${props.height}
	`;

	const eyeIconStyle = {
		position: 'absolute',
		top: '50%',
		right: '5px',
		transform: 'translate(-50%,-50%)',
		color: '#000',
		cursor: 'pointer',
	};

  //------------- States --------------//
	const [passwordState, setPasswordState] = useState({
		fieldType: 'password',
		eyeIcon: true,
	});

	const [fieldContent, setFieldContent] = useState(null);


  //------------- Methods --------------//
	const changePasswordState = () => {
		if (passwordState.fieldType === 'password') {
			setPasswordState({
				fieldType: 'text',
				eyeIcon: false,
			});
		} else {
			setPasswordState({
				fieldType: 'password',
				eyeIcon: true,
			});
		}
	};

	const saveFieldContent = () => {
		let field = document.querySelector('#passwordInputField');
		setFieldContent(field.value);
	};

	return (
		<InputDiv>
			{passwordState.eyeIcon ? (
				<ion-icon style={eyeIconStyle} name="eye-outline" onClick={changePasswordState}></ion-icon>
			) : (
				<ion-icon style={eyeIconStyle} name="eye-off-outline" onClick={changePasswordState}></ion-icon>
			)}

			<InputField
				id="passwordInputField"
				type={passwordState.fieldType}
				value={fieldContent}
				onChange={saveFieldContent}
				autoFocus
			/>
		</InputDiv>
	);
};

export default PasswordField;
