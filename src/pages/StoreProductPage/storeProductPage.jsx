import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactImageMagnify from 'react-image-magnify';
import StoreHeader from '../../components/StoreHeader';
import Placeholder from '../../assets/Images/placeholder.jpg';
import Button from '@material-ui/core/Button';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import StoreFooter from '../../components/StoreFooter';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { baseURL } from '../../config/constants';

const useStyles = makeStyles(() => ({
	button: {
		backgroundColor: '#5673E8',
		color: '#fff',
		'&:hover': {
			transition: '0.2s ease',
			color: '#000',
			backgroundColor: '#d6dcf9',
		},
	},
}));

const ProductContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 1340px;
	min-height: 80vh;
	max-height: fit-content;
	padding: 15px;
	margin: 0 auto;
`;
const ProductImageWrapper = styled.div`
	display: flex;
	align-item: center;
	width: 49%;
	height: fit-content;
`;
const ProductImage = styled.img`
	width: 100%;
	height: auto;
`;
const ProductDetailsWrapper = styled.div`
	width: 50%;
	padding: 10px;
`;
const ProductTitle = styled.p`
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
	width: fit-content;
	margin-bottom: 20px;
	padding: 2px 10px;
	color: #34c38f;
	border-radius: 2px;
	background-color: #eee;
`;
const ButtonBox = styled.div`
	display: flex;
	width: fit-content;
	height: fit-content;
`;

export default function StoreProductPage(props) {
	const classes = useStyles();
	const { loggedUser } = useSelector((state) => state.loginSlice);
	const [productToCart, setProductToCart] = useState(null);
	const { id } = useParams();
	console.log(id);
	const [productDetails, setProductDetails] = useState('');

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await fetch.get(`${baseURL}/product/${id}`);
				console.log(response);
				if (response.status === 200) {
					setProductDetails(response.data.data);
				} else {
					console.log('Failed to fetch product details');
				}
			} catch (error) {
				console.log(error);
				console.log(error.response);
			}
		};
		fetchProductDetails();
	}, []);

	const addToCart = () => {
		const existingNumber = JSON.parse(localStorage.getItem('productsInCart'))?.numberOfProducts;
		console.log(localStorage.getItem('productsInCart'));
		let newNumber;
		existingNumber ? (newNumber = parseInt(existingNumber) + 1) : (newNumber = 1);

		localStorage.setItem('productsInCart', JSON.stringify({ user: loggedUser.email, numberOfProducts: newNumber }));
		setProductToCart(newNumber);
	};

	return (
		<div style={{ backgroundColor: '#fff', color: '#020001' }}>
			<StoreHeader itemsInCart={productToCart} />
			<ProductContentWrapper>
				<ProductImageWrapper>
					<ProductImage src={Placeholder} alt="Product Image" />
				</ProductImageWrapper>
				<ProductDetailsWrapper>
					<ProductTitle>{productDetails?.name || 'Product title'}</ProductTitle>
					<ProductBrand>Product Brand</ProductBrand>
					<ProductDescription>
						{productDetails?.description ||
							'Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quibusdam pariatur optio molestias vitae beatae facilis reprehenderit illo quo. Laboriosam error dolorum delectus porro veritatis vero deserunt commodi, inventore hic.'}
					</ProductDescription>
					<ProductPrice>
						Offer price: <PriceNumber>₹ {productDetails?.price || '16666'}</PriceNumber>
					</ProductPrice>
					<ProductStock>In Stock</ProductStock>
					<ButtonBox>
						<Button
							style={{ marginRight: '10px' }}
							variant="contained"
							className={classes.button}
							startIcon={<AddShoppingCartOutlinedIcon />}
							onClick={addToCart}
							disableElevation>
							Add To Cart
						</Button>
						<Button variant="contained" className={classes.button} startIcon={<ShopOutlinedIcon />} disableElevation>
							Order Now
						</Button>
					</ButtonBox>
				</ProductDetailsWrapper>
			</ProductContentWrapper>
			<StoreFooter />
		</div>
	);
}
//	<ProductImage src={Placeholder} alt="Product Image" />
