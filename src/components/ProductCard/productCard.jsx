import styled from 'styled-components'
const ProductCardWrapper = styled.div`
  height:280px;
  width:250px;
  text-align:center;
`
const ImageWrapper = styled.div`
  width:100%;
  height:75%;
  background-color:#ff00ff;
`
const ProductName = styled.p`
  margin-top:10px;
  font-weight:500;
  color:#000;
`
const ProductPrice = styled.p`
	color: #34c38f;
`;
const ProductBrand = styled.p`
  margin-bottom:10px;
`

export default function ProductCard(props){
  return (
		<ProductCardWrapper>
			<ImageWrapper />
			<ProductName>Tittle</ProductName>
			<ProductPrice>Price</ProductPrice>
			<ProductBrand>Brand</ProductBrand>
		</ProductCardWrapper>
	);
}