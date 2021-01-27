import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard'

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;
const AddButton = styled.button`
	margin-top: 15px;
`;

const CardsWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
  width:100%;
  height:fit-content;
  margin-top:20px;
  
`

export default function ProductsList(props){
  const history = useHistory()

  const redirectToAddProductPage = ()=>{
    history.push('/addProducts');
  }
  return (
		<PageContainer>
			<p className="pageHeaders blackFont">Product List</p>
			<AddButton className="button-primary" onClick={redirectToAddProductPage}>
				+ Add Products
			</AddButton>
			<CardsWrapper>
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
				<ProductCard margin="10px 10px" editable />
			</CardsWrapper>
		</PageContainer>
	);
}