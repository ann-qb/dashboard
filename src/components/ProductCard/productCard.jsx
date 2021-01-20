import styled from 'styled-components';
import Placeholder from '../../assets/Images/placeholder.jpg';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const ImageWrapper = styled.div`
	width: 100%;
	height: 70%;
	background-image: url(${Placeholder});
	background-position: center;
	background-size: cover;
	border-radius: 5px;
`;
const HiddenIcons = styled.div`
	display: none;
	align-item: center;
	width: 100%;
`;
const ProductCardWrapper = styled.div`
	height: 290px;
	width: 250px;
	margin: ${(props) => (props.margin ? props.margin : '0')};
	padding: 5px;
	// text-align: center;
	text-overflow: ellipsis;
	border: 1px solid #eee;
	border-radius: 5px;
	cursor: pointer;

	&:hover ${ImageWrapper} {
		height: 60%;
		transition: all 0.2s ease;
	}
	&:hover ${HiddenIcons} {
		display: flex;
		transition: all 0.2s ease;
	}
`;

const ProductName = styled.p`
	width:100%;
	max-height:20px;
	margin-top: 10px;
	font-weight: 500;
	overflow:hidden;
	text-overflow:ellipsis;
	color: #000;
`;
const ProductPrice = styled.p`
	color: #34c38f;
`;
const ProductBrand = styled.p`
	margin-bottom: 10px;
`;
const ExploreMore = styled.p`
	padding:5px 15px;
	font-size:90%;
	background-color:#eee;
	color: #5673e8;
`;

export default function ProductCard(props) {

	const history = useHistory();

	const sendToProductPage = () => {
		history.push('/product');
	};


	return (
		<ProductCardWrapper margin={props.margin} onClick={sendToProductPage}>
			<ImageWrapper />
			<ProductName>A product name can be something very big like this</ProductName>
			<ProductPrice>₹ 16,666</ProductPrice>
			<ProductBrand>Can be some Cool Brand</ProductBrand>
			<HiddenIcons>
				<ExploreMore>Explore More...</ExploreMore>
			</HiddenIcons>
		</ProductCardWrapper>
	);
}
