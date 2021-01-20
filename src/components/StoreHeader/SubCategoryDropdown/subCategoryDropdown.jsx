import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const DropDownWrapper = styled.div`
	z-index: 999999;
	position: absolute;
	top: 100%;
	display: flex;
	
	width: fit-content;
	height: fit-content;
	padding: 15px;
	margin: 0 auto;
	border-top:1px solid #eee;
`;
const SubCategoryLink = styled.p`
	margin-right: 20px;
	color: #000;
	cursor: pointer;
	transition: all 0.2s ease;
	&:hover {
		color: #5673e8;
	}
`;

export default function SubCategoryDropdown(props) {
  const history = useHistory()
	// const category = props.categoryData;
	const redirectToCategoriesPage = (e) => {
    const subCategory = e.target.innerHTML;
    history.push(`/store-category?category=${props.subCategoryData.category}&subCategory=${subCategory}`);
	};

	return (
		<DropDownWrapper className="cards">
			{props.subCategoryData.subCategories.map((data) => (
				<SubCategoryLink key={data.id} onClick={redirectToCategoriesPage}>
					{data.name}
				</SubCategoryLink>
			))}
		</DropDownWrapper>
	);
}
