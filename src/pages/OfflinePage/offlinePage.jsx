import styled from 'styled-components';
import Header from '../../components/Header';
import OfflinePic from '../../assets/Images/offline2.jpg';

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80vh;
	padding: 15px;
	text-align: center;
	background-color: #fff;
	color: #000;
`;

const ErrorImage = styled.img`
	height: 300px;
	width: auto;
	margin-bottom: 25px;
	margin-right: 20px;
`;
const ErrorMessageMain = styled.p`
	font-weight: 400;
	font-size: 130%;
`;
const ErrorMessage = styled.p`
	font-weight: 400;
	font-size: 100%;
`;

export default function OfflinePage(props) {
	return (
		<>
			<Header page="error" />
			<PageWrapper>
				<ErrorImage src={OfflinePic} />
				<ErrorMessageMain>Oh! Seems like you are offline!</ErrorMessageMain>
				<ErrorMessage>
					The internet is not the same without you :)
					<br /> So check your connection and get back to us!
				</ErrorMessage>
			</PageWrapper>
		</>
	);
}
