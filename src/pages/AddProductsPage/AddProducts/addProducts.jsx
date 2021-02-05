import styled from 'styled-components';
import AlertPopup from '../../../components/Popups/AlertPopups';
import { useState } from 'react';
import ImageUploader from 'react-images-upload';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { onAddProduct, onEditProduct } from '../../../slices/productlist.slice';
import { baseImageURL } from '../../../config/constants';
import { onGetCategoryList } from '../../../slices/categorylist.slice';

const useStyle = makeStyles({
	textField: {
		width: '100%',
	},
	leftButton: {
		marginRight: '15px',
	},
	button: {
		backgroundColor: '#5673E8',
	},
});

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const FlexWrapper = styled.div`
	display: flex;
	height: 100%;
	justify-content: space-between;
	padding: 0;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 90%;
	margin-top: 20px;
	padding: 10px 25px;
	overflow: scroll;
`;
const FormHeader = styled.p`
	margin-bottom: 20px;
	font-size: 120%;
	color: #000;
`;
const MainGroup = styled.div`
	display: flex;
	// flex-direction: column;
	justify-content: space-between;
	width: 100%;
`;
const ItemGroup = styled.div`
	width: 49%;
	margin-bottom: 15px;
`;
const FullWidthItemGroup = styled.div`
	width: 100%;
	height: fit-content;
`;
const PreviewWrapper = styled.div`
	width: 49%;
	height: 90%;
	margin-top: 20px;
	padding: 10px 25px;
	overflow: scroll;
`;
const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	width: fit-content;
	margin: 20px auto;
`;

const ImagePlaceHolder = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 30%;
`;

export default function AddProducts(props) {
	const { categoryList } = useSelector((state) => state.categoryListSlice);
	const { status: loadingStatus } = useSelector((state) => state.productListSlice);
	const classes = useStyle();
	const dispatch = useDispatch();
	const history = useHistory();

	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState('');
	const [status, setStatus] = useState('active');
	const [quantity, setQuantity] = useState('');
	const [category, setCategory] = useState('');
	const [currentCategory, setCurrentCategory] = useState('');
	const [currentCategoryHasSubcategory, setCurrentCategoryHasSubcategory] = useState(false);
	const [subCategory, setSubCategory] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState([]);

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}

	const showAlertPopup = (type, message) => {
		setAlertType(type);
		setAlertMessage(message);
		setAlertDisplay(true);
	};

	useEffect(() => {
		if (categoryList.length === 0) {
			dispatch(onGetCategoryList());
		}
	}, []);

	useEffect(() => {
		const currentCategory = categoryList.find((each) => each.name === category);
		if (currentCategory) {
			setCurrentCategory(currentCategory);
		}
	}, [categoryList, category]);

	useEffect(() => {
		if (currentCategory !== '') {
			currentCategory?.Subcategories?.length === 0
				? setCurrentCategoryHasSubcategory(false)
				: setCurrentCategoryHasSubcategory(true);
		}
	}, [currentCategory]);

	useEffect(() => {
		if (loadingStatus === 'add product success') {
			showAlertPopup('success', 'Product added successfully');
			setProductName('');
			setPrice('');
			setStatus('');
			setQuantity('');
			setCategory('');
			setCurrentCategory('');
			setCurrentCategoryHasSubcategory(false);
			setSubCategory('');
			setDescription('');
			setPicture([]);
		} else if (loadingStatus === 'edit product success') {
			showAlertPopup('success', 'Product edited successfully');
		} else if (loadingStatus === 'add product failed' || loadingStatus === 'edit product failed') {
			showAlertPopup('error', 'Sorry, Something went wrong.');
		}
	}, [loadingStatus]);

	const [productNameError, setProductNameError] = useState(false);
	const [priceError, setPriceError] = useState(false);
	const [categoryError, setCategoryError] = useState(false);
	const [subcategoryError, setSubcategoryError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [pictureError, setPictureError] = useState(false);

	const handleProductNameChange = (e) => {
		setProductName(e.target.value);
	};
	const handlePriceChange = (e) => {
		setPrice(e.target.value);
	};
	const handleStatusChange = (e) => {
		setStatus(e.target.value);
	};
	const handleQuantityChange = (e) => {
		setQuantity(e.target.value);
	};
	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};
	const handleSubCategoryChange = (e) => {
		setSubCategory(e.target.value);
	};
	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};
	const onDrop = (picture) => {
		setPicture([...picture]);
	};

	const addProductValidate = () => {
		let valid = true;
		if (productName === '') {
			setProductNameError(true);
			valid = false;
		}
		if (price === '') {
			setPriceError(true);
			valid = false;
		}
		if (category === '') {
			setCategoryError(true);
			valid = false;
		}
		if (currentCategoryHasSubcategory && subCategory === '') {
			setSubcategoryError(true);
			valid = false;
		}
		if (description === '') {
			setDescriptionError(true);
			valid = false;
		}
		if (picture.length === 0 && productToBeEditedImageURL === '') {
			setPictureError(true);
			valid = false;
		}

		if (valid) {
			setProductNameError(false);
			setPriceError(false);
			setCategoryError(false);
			setSubcategoryError(false);
			setDescriptionError(false);
			setPictureError(false);

			const formData = new FormData();
			formData.append('name', productName);
			formData.append('price', price);
			formData.append('status', status);
			formData.append('quantity', quantity);
			formData.append('category', category);
			if (currentCategoryHasSubcategory) {
				formData.append('subcategory', subCategory);
			}
			formData.append('description', description);
			if (picture[0]) {
				formData.append('avatar', picture[0]);
			}
			if (productId) {
				dispatch(onEditProduct({ productId, formData }));
			} else {
				dispatch(onAddProduct(formData));
			}
		}
	};

	const { productList } = useSelector((state) => state.productListSlice);
	const returnToProductListingPage = () => {
		history.push('/productListing');
	};
	const location = useLocation();
	const useQuery = () => {
		return new URLSearchParams(location.search);
	};
	const query = useQuery();
	const productId = parseInt(query.get('id'));
	const [productToBeEditedImageURL, setProductToBeEditedImageURL] = useState('');
	useEffect(() => {
		if (productId !== null) {
			const productToBeEdited = productList.find((each) => each.id === productId);
			if (productToBeEdited) {
				const category = categoryList.find((each) => each.id === productToBeEdited.category_id);
				const subcategory = category?.Subcategories.find((each) => each.id === productToBeEdited.subcategory_id);
				const imageLocation = productToBeEdited.image;
				setProductToBeEditedImageURL(`${baseImageURL}/${imageLocation}`);
				setProductName(productToBeEdited.name);
				setPrice(productToBeEdited.price);
				setStatus(productToBeEdited.status);
				setQuantity(productToBeEdited.quantity);
				setCategory(category.name);
				if (subcategory?.name) {
					setSubCategory(subcategory.name);
				}
				setDescription(productToBeEdited.description);
			}
		}
	}, [productId]);

	return (
		<>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />
			<PageContainer>
				<p className="pageHeaders blackFont">Add Product</p>
				<FlexWrapper>
					<Form className="cards">
						<FormHeader>Details</FormHeader>
						<MainGroup>
							<ItemGroup>
								<TextField
									className={classes.textField}
									label="Product Name"
									variant="outlined"
									color="#5673E8"
									required
									value={productName}
									onChange={handleProductNameChange}
									error={productNameError}
									helperText={productNameError ? 'This is a required field' : ''}
								/>
							</ItemGroup>

							<ItemGroup>
								<TextField
									className={classes.textField}
									label="Price"
									variant="outlined"
									color="#5673E8"
									required
									value={price}
									onChange={handlePriceChange}
									type="number"
									InputProps={{ inputProps: { min: 0 } }}
									error={priceError}
									helperText={priceError ? 'This is a required field' : ''}
								/>
							</ItemGroup>
						</MainGroup>

						<MainGroup>
							<ItemGroup>
								<TextField
									className={classes.textField}
									select
									label="Status"
									value={status}
									onChange={handleStatusChange}
									variant="outlined"
									color="#5673E8"
									required>
									<MenuItem value="active">Active</MenuItem>
									<MenuItem value="inactive">Inactive</MenuItem>
								</TextField>
							</ItemGroup>
							<ItemGroup>
								<TextField
									className={classes.textField}
									label="Quantity"
									variant="outlined"
									color="#5673E8"
									type="number"
									InputProps={{ inputProps: { min: 0 } }}
									value={quantity}
									onChange={handleQuantityChange}
								/>
							</ItemGroup>
						</MainGroup>
						<MainGroup>
							<ItemGroup>
								<TextField
									className={classes.textField}
									label="Category"
									variant="outlined"
									select
									onChange={handleCategoryChange}
									value={category}
									color="#5673E8"
									required
									error={categoryError}
									helperText={categoryError ? 'This is a required field' : ''}>
									{categoryList.map((item) => (
										<MenuItem key={item.id} value={item.name}>
											{item.name}
										</MenuItem>
									))}
								</TextField>
							</ItemGroup>
							{currentCategoryHasSubcategory ? (
								<ItemGroup>
									<TextField
										className={classes.textField}
										label="Sub Category"
										variant="outlined"
										select
										onChange={handleSubCategoryChange}
										value={subCategory}
										color="#5673E8"
										required
										error={subcategoryError}
										helperText={subcategoryError ? 'This is a required field' : ''}>
										{currentCategory?.Subcategories.map((item) => (
											<MenuItem key={item.id} value={item.name}>
												{item.name}
											</MenuItem>
										))}
									</TextField>
								</ItemGroup>
							) : null}
						</MainGroup>
						<MainGroup>
							<FullWidthItemGroup>
								<TextField
									className={classes.textField}
									label="Description"
									variant="outlined"
									color="#5673E8"
									multiline
									rowsMax={4}
									required
									value={description}
									onChange={handleDescriptionChange}
									error={descriptionError}
									helperText={descriptionError ? 'This is a required field' : ''}
								/>
							</FullWidthItemGroup>
						</MainGroup>

						<ButtonGroup>
							<Button
								className={classes.leftButton}
								variant="outlined"
								color="primary"
								onClick={returnToProductListingPage}>
								Back to listing
							</Button>
							<Button variant="contained" color="primary" disableElevation onClick={addProductValidate}>
								Submit product
							</Button>
						</ButtonGroup>
					</Form>

					<PreviewWrapper className="cards">
						<FormHeader>Upload Image</FormHeader>

						{picture[0] ? (
							<ImagePlaceHolder>
								{picture.map((each) => {
									const tt = URL.createObjectURL(each);
									return <img style={{ width: '90%', height: 'auto' }} src={tt} alt="preview" />;
								})}
							</ImagePlaceHolder>
						) : (
							<>
								{productId ? (
									<ImagePlaceHolder>
										<img style={{ width: '90%', height: 'auto' }} src={productToBeEditedImageURL} alt="preview" />
									</ImagePlaceHolder>
								) : (
									<ImagePlaceHolder />
								)}
							</>
						)}

						<ImageUploader
							className="uploadCard"
							withIcon={true}
							onChange={onDrop}
							imgExtension={['.jpg', '.png']}
							label="Max file size: 5MB, Accepted: jpg, png"
							maxFileSize={5242880}
							buttonClassName="imageUploadBtn"
							singleImage={true}
							buttonText="Choose Image"
						/>

						{pictureError ? <p>Please upload a product image</p> : null}
					</PreviewWrapper>
				</FlexWrapper>
			</PageContainer>
		</>
	);
}
