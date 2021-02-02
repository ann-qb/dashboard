import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard';
import AlertPopup from '../../../components/Popups/AlertPopups';
import { useDispatch, useSelector } from 'react-redux';
import { onGetProductList } from '../../../slices/productlist.slice';
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
		dispatch(onGetProductList({ currentPage }));
	}, [currentPage]);
	const [loadingListFailed, setLoadingListFailed] = useState(false);

	useEffect(() => {
		console.log(status);
		if (status === 'loading product list failed') {
			setLoadingListFailed(true);
		}
		if(status === 'delete product success'){
			showAlertPopup('success','Product Deleted')
		}
		else if(status === 'delete product failed'){
			showAlertPopup('error', 'Cannot delete product');
		}
	}, [status]);

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

	return (
		<PageContainer>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />
			
			<p className="pageHeaders blackFont">Product List</p>
			<AddButton className="button-primary" onClick={redirectToAddProductPage}>
				+ Add Products
			</AddButton>

			{loadingListFailed ? (
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
								{productList.map((each) => (
									<ProductCard margin="10px 20px 10px 0" editable key={each.id + each.name} data={each} />
								))}
							</CardsWrapper>
							{pageCount === 1 ? null : <Pagination count={pageCount} shape="rounded" onChange={handlePageChange} />}
						</>
					)}
				</>
			)}
		</PageContainer>
	);
}
