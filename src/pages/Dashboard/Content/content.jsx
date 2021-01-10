import styled from 'styled-components';
import Header from '../../../components/Header';
import UserPage from '../UserPage';
import ProfilePage from '../ProfilePage';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content(props) {
	const mockUserData = {
		username: 'thejuss@qburst.com',
		firstName: 'Thejus',
		lastName: 'Satheesan',
	};
	return (
		<ContentContainer>
			<Header userData={mockUserData} />
			<ProfilePage />
		</ContentContainer>
	);
}
