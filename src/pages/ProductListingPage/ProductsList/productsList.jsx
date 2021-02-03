import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard';
import AlertPopup from '../../../components/Popups/AlertPopups';
import ProductCardPreLoader from '../../../components/ProductCardPreLoader';
import { useDispatch, useSelector } from 'react-redux';
import { onGetProductList, onSearchAllProductsList } from '../../../slices/productlist.slice';
import { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ErrorImg from '../../../assets/Images/sadError.png';

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
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: fit-content;
	margin-top: 20px;
`;
const FailureWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: fit-content;
	padding: 10px;
	margin-top: 20px;
	background-color: #fff;
`;
const FailureImage = styled.img`
	width: 50%;
	height: auto;
`;
const FailureText = styled.p`
	font-size: 120%;
	margin-top: 20px;
`;

export default function ProductsList(props) {
	const history = useHistory();
	const { productList, totalPages, status } = useSelector((state) => state.productListSlice);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);

	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	const [showLoading, setShowLoading] = useState(false);

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

	const dispatch = useDispatch();
	useEffect(() => {
		// if (productList.length === 0) {
		// 	dispatch(onGetProductList({ currentPage }));
		// }
		dispatch(onGetProductList({ currentPage: 1 }));
	}, []);

	useEffect(() => {
		setCurrentPage(1);
		if (props.searchTerm === '') {
			console.log(props.searchTerm);
			dispatch(onGetProductList({ currentPage: 1 }));
		} else {
			dispatch(onSearchAllProductsList({ searchTerm: props.searchTerm, currentPage: 1 }));
		}
	}, [props.searchTerm]);

	useEffect(() => {
		if (
			productList.slice((currentPage - 1) * range, range * currentPage)[0] === null ||
			productList.slice((currentPage - 1) * range, range * currentPage)[0] === undefined
		) {
			if (props.searchTerm === '') {
				dispatch(onGetProductList({ currentPage, update: true }));
			} else {
				dispatch(onSearchAllProductsList({ searchTerm: props.searchTerm, currentPage, update: true }));
			}
		}
	}, [currentPage]);
	const [loadingListFailed, setLoadingListFailed] = useState(false);

	useEffect(() => {
		console.log(status);
		if (status === 'loading product list') {
			setShowLoading(true);
		} else {
			setShowLoading(false);
		}
		if (status === 'loading product list failed') {
			setLoadingListFailed(true);
		}
		if (status === 'delete product success') {
			showAlertPopup('success', 'Product Deleted');
		} else if (status === 'delete product failed') {
			showAlertPopup('error', 'Cannot delete product');
		}
	}, [status]);

	useEffect(() => {
		const pageContainer = document.querySelector('#scrollToTop');
		console.log('>>>>>>>>>>> page Change');
		pageContainer['scrollTo']({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	const redirectToAddProductPage = () => {
		history.push('/addProducts');
	};

	const redirectToAddProductsPage = () => {
		history.push('/addProducts');
	};

	const handlePageChange = (e, value) => {
		setCurrentPage(value);
	};

	useEffect(() => {
		setPageCount(totalPages);
	}, [totalPages]);
	const range = 16;
	return (
		<>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />
			<PageContainer id="scrollToTop">
				<p className="pageHeaders blackFont">Product List</p>
				<AddButton className="button-primary" onClick={redirectToAddProductPage}>
					+ Add Products
				</AddButton>

				{showLoading ? (
					<CardsWrapper>
						<ProductCardPreLoader cardCount="12" margin="10px 20px 10px 0" />
					</CardsWrapper>
				) : loadingListFailed ? (
					<FailureWrapper>
						<FailureImage src={ErrorImg} alt="Error Image" />
						<FailureText>Sorry, failed to load products.</FailureText>
					</FailureWrapper>
				) : (
					<>
						{productList.length === 0 ? (
							<FailureWrapper>
								<FailureImage src={ErrorImg} alt="Error Image" />
								<FailureText>Sorry, there are no products to show.</FailureText>
							</FailureWrapper>
						) : (
							<>
								<CardsWrapper>
									{productList.slice((currentPage - 1) * range, range * currentPage).map((each) => (
										<ProductCard margin="10px 20px 10px 0" editable key={each.id + each.name} data={each} />
									))}
								</CardsWrapper>
								{pageCount === 1 ? null : (
									<Pagination page={currentPage} count={pageCount} shape="rounded" onChange={handlePageChange} />
								)}
							</>
						)}
					</>
				)}
			</PageContainer>
		</>
	);
}
