import styled from 'styled-components';
import { useState } from 'react';
import Placeholder from '../../assets/Images/placeholder.jpg';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteConfirmPopup from '../../components/Popups/DeleteConfirmPopup';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useEffect } from 'react';
import { baseImageURL } from '../../config/constants';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

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
const Clickable = styled.div`
	width: 100%;
	height: 100%;
	cursor: pointer;
`;
const ProductCardWrapper = styled.div`
	height: 290px;
	width: 250px;
	margin: ${(props) => (props.margin ? props.margin : '0')};
	padding: 5px;
	// text-align: center;
	border: 1px solid #eee;
	border-radius: 5px;

	background-color: #fff;
	overflow: hidden;

	&:hover ${Clickable} {
		height: 85%;
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
	margin-top: 10px;
	background-color: #eee;
	color: #5673e8;
	cursor: pointer;
`;

export default function ProductCard(props) {
	const history = useHistory();
	const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);

	const sendToProductPage = (e) => {
		console.log(e.target.id);
		history.push(`/product/${props.data.id}`);
	};
	const sendToEditProductsPage = () => {
		history.push('/addProducts');
	};

	const askForDeleteConfirmation = () => {
		setDeletePopupIsOpen(true);
	};

	const closeDeleteModal = () => {
		setDeletePopupIsOpen(false);
	};

	const onDeleteConfirmation = () => {
		setDeletePopupIsOpen(false);
		alert('Deleted');
	};
	const imageURL = `${baseImageURL}/${props?.data?.image}`;

	return (
		<ProductCardWrapper margin={props.margin}>
			<Clickable onClick={sendToProductPage}>
				<ImageWrapper imageSrc={imageURL} />
				<ProductNameWrapper>
					<ProductName>{props?.data?.name || 'A product name can be something very big like this'}</ProductName>
				</ProductNameWrapper>

				<ProductPrice>{'₹ ' + (props?.data?.price || '16,666')}</ProductPrice>

				<ProductBrandWrapper>
					<ProductBrand>Can be some Cool Brand</ProductBrand>
				</ProductBrandWrapper>
			</Clickable>
			<HiddenIcons>
				{props.editable ? (
					<>
						<IconButton onClick={sendToEditProductsPage} id="edit_product">
							<CreateOutlinedIcon fontSize="small" />
						</IconButton>
						<IconButton onClick={askForDeleteConfirmation}>
							<DeleteOutlineOutlinedIcon fontSize="small" />
						</IconButton>
					</>
				) : (
					<ExploreMore onClick={sendToProductPage}>Explore More...</ExploreMore>
				)}
			</HiddenIcons>

			<DeleteConfirmPopup
				isOpen={deletePopupIsOpen}
				onRequestClose={closeDeleteModal}
				onDelete={onDeleteConfirmation}
			/>
		</ProductCardWrapper>
	);
}
