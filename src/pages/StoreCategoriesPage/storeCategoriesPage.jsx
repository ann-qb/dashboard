import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import ProductCards from '../../components/ProductCard';
import StoreFooter from '../../components/StoreFooter';
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

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
	return (
		<>
			<StoreHeader />
			<ContentWrapper>
				<FiltersWrapper className="cards">
					<SectionHeading>Filters</SectionHeading>
				</FiltersWrapper>
				<ProductsWrapper className="cards">
					{subCategory ? (
						<>
							<p style={{ marginBottom: '15px' }}>
								<span>{category}</span> / <span>{subCategory}</span>
							</p>
							<SectionHeading>{subCategory}</SectionHeading>
						</>
					) : (
						<SectionHeading>{category}</SectionHeading>
					)}

					<ProductCardWrapper>
						<ProductCards margin="5px 5px" />
						<ProductCards margin="5px 5px" />
						<ProductCards margin="5px 5px" />
						<ProductCards margin="5px 5px" />
						<ProductCards margin="5px 5px" />
						<ProductCards margin="5px 5px" />
					</ProductCardWrapper>
					<Pagination count={10} shape="rounded" />
				</ProductsWrapper>
			</ContentWrapper>
			<StoreFooter />
		</>
	);
}
