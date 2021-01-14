import CategoryCard from './CatagoryCards';
import styled from 'styled-components'

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const AddCategoryWrapper = styled.div`
	padding: 10px;
	padding-left:0;
	margin-top:15px;
	margin-bottom:5px;
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

export default function Catagories(props){
  return (
		<PageContainer>
			<p className="pageHeaders blackFont">Categories</p>
			<AddCategoryWrapper>
				<Input placeholder="Category" />
				<Button className="button-primary">Add</Button>
			</AddCategoryWrapper>
			<CategoryCard />
			<CategoryCard />
		</PageContainer>
	);
}