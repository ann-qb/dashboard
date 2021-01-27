import styled from 'styled-components';
import Placeholder from '../../assets/Images/placeholder.jpg';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useEffect } from 'react';
import { baseImageURL } from '../../config/constants';

const ImageWrapper = styled.div`
	width: 100%;
	height: 70%;
	background-image: ${(props) => `url(${props.imageSrc})`};
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
const ProductNameWrapper = styled.div`
	width: 100%;
	max-height: 20px;
	margin-top: 10px;
`;
const ProductName = styled.p`
	display: block;
	margin: 0;
	font-weight: 500;
	color: #000;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
const ProductPrice = styled.p`
	color: #34c38f;
`;
const ProductBrandWrapper = styled.div`
	width: 100%;
	max-height: 20px;
	margin-bottom: 10px;
`;
const ProductBrand = styled.p`
	display: block;
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
const ExploreMore = styled.p`
	padding: 5px 15px;
	font-size: 90%;
	background-color: #eee;
	color: #5673e8;
`;

export default function ProductCard(props) {
	const history = useHistory();

	const sendToProductPage = () => {
		history.push('/product');
	};

	const imageURL = `${baseImageURL}/${props?.data?.image}`;
	// if (props.data) console.log(imageURL);
	return (
		<ProductCardWrapper margin={props.margin} onClick={sendToProductPage}>
			{/* {props?.data?.image !== undefined ? <ImageWrapper imageSrc={imageURL} /> : <ImageWrapper />} */}
			<ImageWrapper imageSrc={imageURL} />
			<ProductNameWrapper>
				<ProductName>{props?.data?.name || 'A product name can be something very big like this'}</ProductName>
			</ProductNameWrapper>

			<ProductPrice>{'₹ ' + (props?.data?.price || '16,666')}</ProductPrice>

			<ProductBrandWrapper>
				<ProductBrand>Can be some Cool Brand</ProductBrand>
			</ProductBrandWrapper>
			<HiddenIcons>
				<ExploreMore>Explore More...</ExploreMore>
			</HiddenIcons>
		</ProductCardWrapper>
	);
}
