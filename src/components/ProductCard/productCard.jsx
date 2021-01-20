import styled from 'styled-components'
import Placeholder from '../../assets/Images/placeholder.jpg'
const ProductCardWrapper = styled.div`
  height:280px;
  width:250px;
  margin:${(props)=>props.margin? props.margin : '0'};
  text-align:center;
`;
const ImageWrapper = styled.div`
  width:100%;
  height:75%;
  background-image: url(${Placeholder});
	background-position: center;
	background-size: cover;
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
		<ProductCardWrapper margin={props.margin}>
			<ImageWrapper />
			<ProductName>Tittle</ProductName>
			<ProductPrice>Price</ProductPrice>
			<ProductBrand>Brand</ProductBrand>
		</ProductCardWrapper>
	);
}