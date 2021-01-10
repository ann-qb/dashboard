import styled from 'styled-components';
import Header from '../../components/Header';
import NotFoundImg from '../../assets/Images/404.png';
import ServerDownImg from '../../assets/Images/server_down.png';
import UnknownImg from '../../assets/Images/unknown_error.png';
import { Redirect, useHistory } from 'react-router-dom';

const PageWrapper = styled.div`
	height: 90vh;
	padding: 15px;
	text-align: center;
	background-color: #fff;
	color: #000;
`;
const ErrorCode = styled.p`
	font-size: 900%;
	font-weight: 500;
	color: #5673e8;
`;

const ErrorImage = styled.img`
	height: 300px;
	width: auto;
	margin-bottom: 25px;
`;

const ErrorMessage = styled.p`
	font-weight: 500;
	font-size: 120%;
`;

export default function ErrorPage(props) {
	const history = useHistory();
	let imageSrc, errorMessage;
	if (props.errorType === '404') {
		imageSrc = NotFoundImg;
		errorMessage = "Opps! The page you requested doesn't seem to exist.";
	} else if (props.errorType === '503' || props.errorType === '502') {
		imageSrc = ServerDownImg;
		errorMessage = "Sorry! There's something wrong with the servers.";
	} else {
		imageSrc = UnknownImg;
		errorMessage = 'Sorry! Something unexpected just happened.';
	}

	const redirectToLoginPage = () => {
		history.push('/login');
	};

	return (
		<>
			<Header />
			<PageWrapper>
				<ErrorImage src={imageSrc} />
				<ErrorMessage>{errorMessage}</ErrorMessage>
				<button style={{ marginTop: '25px' }} className="button-primary" onClick={redirectToLoginPage}>
					Let's take you back
				</button>
			</PageWrapper>
		</>
	);
}
