import Header from '../../../components/Header';
import Profile from '../Profile';
import styled from 'styled-components';

const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	return (
		<ContentContainer>
			<Header />
			<Profile />
		</ContentContainer>
	);
}
