import CategoryCard from './CatagoryCards';
import styled from 'styled-components'

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

export default function Catagories(props){
  return (
		<PageContainer>
			<p className="pageHeaders blackFont">Categories</p>
			<CategoryCard />
			<CategoryCard />
		</PageContainer>
	);
}