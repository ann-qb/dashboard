import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import ProductCards from '../../components/ProductCard';
import StoreFooter from '../../components/StoreFooter';
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetStoreProductListing } from '../../slices/storeproductlisting.slice';

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
	padding: 10px 0;
`;

export default function StoreCategoriesPage(props) {
	const history = useHistory();
	const location = useLocation();

	const useQuery = () => {
		return new URLSearchParams(location.search);
	};
	let query = useQuery();

	// Query data
	const category = query.get('category');
	let subCategory = query.get('subCategory');
	if (category === subCategory) subCategory = null;
	const dispatch = useDispatch();
	const { productListing } = useSelector((state) => state.storeProductListingSlice);
	useEffect(() => {
		if (subCategory === null) {
			dispatch(onGetStoreProductListing({ category }));
		} else {
			dispatch(onGetStoreProductListing({ subCategory }));
		}
	}, [category, subCategory]);

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
					<ProductCardWrapper>
						{productListing.map((each) => (
							<ProductCards key={each.id + each.name} data={each} margin="5px 5px" />
						))}
						
					</ProductCardWrapper>
					<Pagination count={10} shape="rounded" />
				</ProductsWrapper>
			</ContentWrapper>
			<StoreFooter />
		</>
	);
}
