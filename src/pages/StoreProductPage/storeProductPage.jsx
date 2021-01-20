import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import Placeholder from '../../assets/Images/placeholder.jpg';
import Button from '@material-ui/core/Button';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';

const ProductContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: fit-content;
	padding: 15px;
`;
const ProductImageWrapper = styled.div`
	display: flex;
	align-item: center;
	width: 49%;
`;
const ProductImage = styled.img`
	width: 100%;
	height: auto;
`;
const ProductDetailsWrapper = styled.div`
	width: 50%;
	padding: 10px;
`;
const ProductTittle = styled.p`
	margin-bottom: 10px;
	font-size: 150%;
	color: #000;
`;
const ProductBrand = styled.p`
	margin-bottom: 20px;
	font-size: 120%;
`;
const ProductDescription = styled.p`
	margin-bottom: 10px;
	font-size: 100%;
`;
const ProductPrice = styled.p`
	margin-bottom: 10px;
`;
const PriceNumber = styled.span`
	font-size: 130%;
	color: #34c38f;
`;
const ProductStock = styled.p`
	margin-bottom: 20px;
	color: #34c38f;
`;
const ButtonBox = styled.div`
	display: flex;
	width: fit-content;
	height: fit-content;
`;

export default function StoreProductPage(props) {
	return (
		<div style={{ backgroundColor: '#fff' }}>
			<StoreHeader />
			<ProductContentWrapper>
				<ProductImageWrapper>
					<ProductImage src={Placeholder} alt="Product Image" />
				</ProductImageWrapper>
				<ProductDetailsWrapper>
					<ProductTittle>Product tittle</ProductTittle>
					<ProductBrand>Product Brand</ProductBrand>
					<ProductDescription>
						Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quibusdam pariatur optio
						molestias vitae beatae facilis reprehenderit illo quo. Laboriosam error dolorum delectus porro veritatis
						vero deserunt commodi, inventore hic.
					</ProductDescription>
					<ProductPrice>
						Offer price:<PriceNumber> ₹ 16666</PriceNumber>
					</ProductPrice>
					<ProductStock>In Stock</ProductStock>
					<ButtonBox>
						<Button
							style={{ marginRight: '10px' }}
							variant="contained"
							color="primary"
							startIcon={<AddShoppingCartOutlinedIcon />}
						>
							Add To Cart
						</Button>
						<Button variant="contained" color="primary" startIcon={<ShopOutlinedIcon />}>
							Order Now
						</Button>
					</ButtonBox>
				</ProductDetailsWrapper>
			</ProductContentWrapper>
		</div>
	);
}
