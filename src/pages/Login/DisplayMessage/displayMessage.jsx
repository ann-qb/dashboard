import styled from 'styled-components';
import Logo from '../../../assets/Images/logo_black.png';
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';

/**---------------- Styles ------------------*/
const Card = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	justify-content: center;
	width: 350px;
	padding: 20px 20px !important;
	text-align: center;
	transform: translate(-50%, -50%);
`;
const Button = styled.button`
	width: 90%;
	margin-top: 25px;
`;
const MessageText = styled.p`
	color: #000;
	font-size: 110%;
	font-weight: 500;
`;
const StyledLogo = styled.img`
	width: 120px;
	height: auto;
	margin-bottom: 20px;
	text-align: center;
`;

export default function DisplayMessage(props) {
	const [location, setLocation] = useState(null);

	const history = useHistory();
	const backToLogin = () => {
		history.push('/');
		setLocation('/');
	};

	return (
		<Card className="cards">
			<span>
				<StyledLogo src={Logo} />
			</span>
			<MessageText>{props.message}</MessageText>
			<Button className="button-primary" onClick={props.onClick}>
				Back to Login
			</Button>
		</Card>
	);
}
