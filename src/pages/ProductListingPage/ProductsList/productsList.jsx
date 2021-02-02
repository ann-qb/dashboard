import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { onGetProductList } from '../../../slices/productlist.slice';
import { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

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

export default function ProductsList(props) {
	const history = useHistory();
	const { productList, totalPages } = useSelector((state) => state.productListSlice);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const dispatch = useDispatch();
	useEffect(() => {
		// if (productList.length === 0) {
		// 	dispatch(onGetProductList({ currentPage }));
		// }
		dispatch(onGetProductList({ currentPage }));
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

	return (
		<PageContainer>
			<p className="pageHeaders blackFont">Product List</p>
			<AddButton className="button-primary" onClick={redirectToAddProductPage}>
				+ Add Products
			</AddButton>
			<CardsWrapper>
				{productList.map((each) => (
					<ProductCard margin="10px 20px 10px 0" editable key={each.id + each.name} data={each} />
				))}
			</CardsWrapper>
			{pageCount === 1 ? null : <Pagination count={pageCount} shape="rounded" onChange={handlePageChange} />}
		</PageContainer>
	);
}
