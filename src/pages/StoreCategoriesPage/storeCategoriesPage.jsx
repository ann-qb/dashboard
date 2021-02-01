import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import ProductCards from '../../components/ProductCard';
import StoreFooter from '../../components/StoreFooter';
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetStoreProductListing, onSearchStore } from '../../slices/storeproductlisting.slice';
import ShowIfAuth from '../../components/ShowIfAuth';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { BounceLoader } from 'react-spinners';

const useStyles = makeStyles(() => ({
	button: {
		backgroundColor: '#5673E8',
		marginTop: '20px',
		color: '#fff',
		'&:hover': {
			transition: '0.2s ease',
			color: '#000',
			backgroundColor: '#d6dcf9',
		},
	},
}));

const ContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	height: fit-content;
	width: fit-content;
	padding: 15px 0;
	margin: 0 auto;
`;
const FiltersWrapper = styled.div`
	width: 270px;
	height: 100%;
	margin: 0 5px;
`;
const ProductsWrapper = styled.div`
	width: 1060px;
	height: 100%;
	margin: 0 5px;
`;

const SectionHeading = styled.p`
	font-size: 130%;
	color: #000;
`;
const ProductCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	min-height: 80vh;
	padding: 10px 0;
`;

const NoProductMessageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: fit-content;
	margin: 20px 0;
`;

const SpinnerDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 200px;
	margin: auto 0;
`;

export default function StoreCategoriesPage(props) {
	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();

	const useQuery = () => {
		return new URLSearchParams(location.search);
	};
	let query = useQuery();

	// Query data
	const searchTerm = query.get('search');
	const category = query.get('category');
	let subCategory = query.get('subCategory');
	if (category === subCategory) subCategory = null;
	const dispatch = useDispatch();
	const { productListing, totalPages, status } = useSelector((state) => state.storeProductListingSlice);
	const [showLoading, setShowLoading] = useState(true);
	useEffect(() => {
		console.log(status);
		if (status === 'loading product listing' || status === 'searching store') {
			setShowLoading(true);
		} else if (status === 'loading product listing over' || status === 'searching store over') {
			setShowLoading(false);
		}
	}, [status]);

	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	useEffect(() => {
		if (searchTerm !== null) {
			dispatch(onSearchStore({ searchTerm, currentPage }));
		} else if (subCategory === null) {
			dispatch(onGetStoreProductListing({ category, currentPage }));
		} else {
			dispatch(onGetStoreProductListing({ subCategory, currentPage }));
		}
	}, [category, subCategory, currentPage, searchTerm]);

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
		<>
			<StoreHeader />
			<ContentWrapper>
				<FiltersWrapper className="cards">
					<SectionHeading>Filters</SectionHeading>
				</FiltersWrapper>
				<ProductsWrapper className="cards">
					<p style={{ marginBottom: '15px' }}>
						{category ? (
							<>
								<span>{category}</span>{' '}
								{subCategory ? (
									<>
										/ <span>{subCategory}</span>
									</>
								) : null}
							</>
						) : null}
					</p>
					<SectionHeading>{subCategory}</SectionHeading>
					{showLoading ? (
						<SpinnerDiv>
							<BounceLoader size={100} color={'#5673E8'} />
						</SpinnerDiv>
					) : (
						<ProductCardWrapper>
							{productListing.length === 0 ? (
								<NoProductMessageWrapper>
									<p>Sorry, No Products Available</p>
									<ShowIfAuth allowedRoles={['admin']}>
										<Button
											variant="contained"
											className={classes.button}
											disableElevation
											onClick={redirectToAddProductsPage}>
											Add Products
										</Button>
									</ShowIfAuth>
								</NoProductMessageWrapper>
							) : null}
							{productListing.map((each) => (
								<ProductCards key={each.id + each.name} data={each} margin="5px 5px" />
							))}
						</ProductCardWrapper>
					)}
					{pageCount === 1 ? null : <Pagination count={pageCount} shape="rounded" onChange={handlePageChange} />}
				</ProductsWrapper>
			</ContentWrapper>
			<StoreFooter />
		</>
	);
}
