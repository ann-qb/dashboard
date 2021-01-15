import CategoryCard from './CategoryCards';
import styled from 'styled-components';

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const AddCategoryWrapper = styled.div`
	padding: 10px;
	padding-left: 0;
	margin-top: 15px;
	margin-bottom: 5px;
`;
const Button = styled.button`
	height: 100%;
`;
const Input = styled.input`
	height: 100%;
	padding: 8px;
	margin-right: 15px;
	border: 0.2px solid #dcdde2;
`;

const categoriesArray = {
	Electronics: ['Mobile Accesspries', 'Computer Peripherals', 'Power bank', 'Laptop Accessories', 'Tablets'],
	Fashion: ['Jeans', 'T-shirts', 'Dresses', 'Caps'],
	Grocery: [],
	Mobiles: [],
};

const items = [];
for (const each in categoriesArray) {
	items.push(<CategoryCard categoryName={each} subCategories={categoriesArray[each].reverse()}/>);
}
const itemList = items.reverse();
export default function Categories(props) {
	return (
		<PageContainer>
			<p className="pageHeaders blackFont">Categories</p>
			<AddCategoryWrapper>
				<Input placeholder="Category" />
				<Button className="button-primary">Add</Button>
			</AddCategoryWrapper>
			{itemList}
			{/* <CategoryCard />
			<CategoryCard /> */}
		</PageContainer>
	);
}

