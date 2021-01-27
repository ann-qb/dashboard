import styled from 'styled-components';
import Header from '../../../components/Header';
import ProductsList from '../ProductsList';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	return (
		<ContentContainer>
			<Header />
			<ProductsList />
		</ContentContainer>
	);
}
