import styled from 'styled-components';
import Header from '../../../components/Header';
import UserPage from '../UserPage';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	return (
		<ContentContainer>
			<Header />
			<UserPage />
		</ContentContainer>
	);
}
