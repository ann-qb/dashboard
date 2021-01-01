import { useState } from 'react';
import styled from 'styled-components';
import PasswordField from '../PasswordField';

const Password = (props) => {
	const Card = styled.div`
		width: 30%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
  `;
  
  const SubmitButton = styled.button`
    margin-top:5px;
  `

	return (
    
		<Card className='cards'>
			<p>Password</p>
			<PasswordField margin='5px 0' height='30px'/>
			<SubmitButton className='button-primary'>Next</SubmitButton>
		</Card>
	);
};

export default Password;
