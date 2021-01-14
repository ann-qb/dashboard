import styled from 'styled-components';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';





const Card = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	margin-top: 10px;
	padding: 10px 10px;
	background-color: #fff;
`;

const CategoryText = styled.p`
  font-size:120%;
`

const CategoryNameWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 85%;
	height: 100%;
	margin-left: 10px;
`;

const SeparationLine = styled.hr`
	border: 1px solid #dcdde2;
`;

const AddSubCategoryWrapper = styled.div`
  padding:10px;
`
const Button = styled.button`
  height:100%;
`
const Input = styled.input`
	height: 100%;
	padding: 8px;
	margin-right: 15px;
	border: 0.2px solid #dcdde2;
`;
const SubCard = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
  padding: 10px 10px;
  margin-bottom:2px;
	background-color: #fff;
`;

const SubCategoryNameWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 88%;
	height: 100%;
	margin-left: 10px;
`;
const SubCategoryText = styled.p`
	font-size: 100%;
`;

export default function CategoryCard(props) {
  const [open, setOpen] = useState(false);
  
  const GenerateSubCategory=(props)=>{
    return (
			<SubCard>
				<SubCategoryNameWrapper>
					<SubCategoryText>{props.name}</SubCategoryText>
				</SubCategoryNameWrapper>

				<IconButton style={{ marginRight: '15px' }} aria-label="expand row" size="small">
					<CreateOutlinedIcon />
				</IconButton>

				<IconButton aria-label="expand row" size="small">
					<DeleteOutlineOutlinedIcon />
				</IconButton>
			</SubCard>
		);
  }

	return (
		<>
			<Card>
				<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>

				<CategoryNameWrapper>
					<CategoryText>Cloths</CategoryText>
				</CategoryNameWrapper>

				<IconButton style={{ marginRight: '15px' }} aria-label="expand row" size="small">
					<CreateOutlinedIcon />
				</IconButton>

				<IconButton aria-label="expand row" size="small">
					<DeleteOutlineOutlinedIcon />
				</IconButton>
			</Card>

			<Collapse style={{ backgroundColor: '#fff' }} in={open} timeout="auto" unmountOnExit>
				<SeparationLine />
				<AddSubCategoryWrapper>
					<Input placeholder="Sub Category" />
					<Button className="button-primary">Add</Button>
				</AddSubCategoryWrapper>
				<GenerateSubCategory name="Shirts" />
				<GenerateSubCategory name="Pants" />
				<GenerateSubCategory name="Shoes" />
			</Collapse>
		</>
	);
}
