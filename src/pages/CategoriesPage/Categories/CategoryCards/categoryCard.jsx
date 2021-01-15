import styled from 'styled-components';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { useDispatch } from 'react-redux';
import { onAddSubCategory, onDeleteSubCategory, onEditSubCategory } from '../../../../slices/categorylist.slice';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const Card = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	margin-top: 10px;
	padding: 10px 10px;
	background-color: #fff;
`;

const CategoryText = styled.p`
	font-size: 120%;
`;

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
	padding: 10px;
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
const SubCard = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 10px 10px;
	margin-bottom: 2px;
	background-color: #fff;
	position: relative;
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

const SubCategoryInput = styled.input`
	${'' /* border: none; */}
	height: 100%;
	padding: 8px;
	margin-right: 15px;
	border: 0.2px solid #dcdde2;
`;

const DisabledDiv = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 1;
	background-color: #ddd;
	opacity: 0.3;
	display: ${(props) => (props.disable ? 'block' : 'none')};
	cursor: default;
`;

export default function CategoryCard(props) {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [disableDiv, setDisableDiv] = useState(false);
	const [newSubCategory, setNewSubCategory] = useState('');
	const [disableAdd, setDisableAdd] = useState(true);
	const [editedcategory, setEditedcategory] = useState(props.category.name);

	useEffect(() => {
		if (!open) setNewSubCategory('');
	}, [open]);

	useEffect(() => {
		newSubCategory.trim().length !== 0 ? setDisableAdd(false) : setDisableAdd(true);
	}, [newSubCategory]);

	const handleInputChange = (e) => {
		setNewSubCategory(e.target.value);
	};

	const cancelAddNewSubCategory = () => {
		setNewSubCategory('');
	};

	const addNewSubCategory = () => {
		dispatch(onAddSubCategory({ subcategory: newSubCategory, parentCategoryId: props.category.id }));
		console.log({ subcategory: newSubCategory, parentCategoryId: props.category.id });
	};

	return (
		<>
			<Card>
				<DisabledDiv disable={disableDiv}></DisabledDiv>
				<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>

				<CategoryNameWrapper>
					<CategoryText>{props.category.name}</CategoryText>
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
					<Input
						value={newSubCategory}
						onChange={handleInputChange}
						// onBlur={cancelAddNewSubCategory}
						placeholder="Sub Category"
					/>
					<Button disabled={disableAdd} className="button-primary" onClick={addNewSubCategory}>
						Add
					</Button>
				</AddSubCategoryWrapper>
				{props.category.subcategories.reverse().map((each) => (
					<GenerateSubCategory key={each.id + each.name} subcategory={each} />
				))}
			</Collapse>
		</>
	);
}

const GenerateSubCategory = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [edit, setEdit] = useState(false);
	const [disableInput, setDisableInput] = useState(false);
	const [disableDiv, setDisableDiv] = useState(false);
	const [editedSubcategory, setEditedSubcategory] = useState(props.subcategory.name);

	const handleInputChange = (e) => {
		setEditedSubcategory(e.target.value);
	};

	const keyPress = (e) => {
		if (e.key === 'Enter') {
			console.log('enter pressed');
			if (editedSubcategory.trim().length !== 0) {
				setDisableInput(true);
				dispatch(
					onEditSubCategory({
						subcategory: editedSubcategory,
						subcategoryId: props.subcategory.id,
						parentCategoryId: props.subcategory.category,
					})
				);
			}
			// setEdit(false);
		}
	};

	const editSubcategory = () => {
		if (editedSubcategory.trim().length !== 0) {
			setDisableInput(true);
			dispatch(
				onEditSubCategory({
					subcategory: editedSubcategory,
					subcategoryId: props.subcategory.id,
					parentCategoryId: props.subcategory.category,
				})
			);
		}
		// setEdit(false);
	};
	const toggleEnableEditSubcategory = () => {
		edit ? setEdit(false) : setEdit(true);
		setEditedSubcategory(props.subcategory.name);
	};

	const resetEditSubcategory = () => {
		setEditedSubcategory('');
	};

	const cancelEditSubcategory = () => {
		setEditedSubcategory(props.subcategory.name);
	};

	const deleteSubCategory = () => {
		dispatch(
			onDeleteSubCategory({
				subcategory: props.subcategory.name,
				subcategoryId: props.subcategory.id,
				parentCategoryId: props.subcategory.category,
			})
		);
		console.log({
			subcategory: props.subcategory.name,
			subcategoryId: props.subcategory.id,
			parentCategoryId: props.subcategory.category,
		});
		setDisableDiv(true);
	};

	return (
		<div>
			<SubCard>
				<DisabledDiv disable={disableDiv}></DisabledDiv>
				{edit ? (
					<SubCategoryNameWrapper>
						<SubCategoryInput
							value={editedSubcategory}
							onChange={handleInputChange}
							onKeyDown={keyPress}
							disabled={disableInput}
							autoFocus
						/>
						{disableInput ? (
							<div className={classes.root}>
								<CircularProgress size={20} />
							</div>
						) : null}
					</SubCategoryNameWrapper>
				) : (
					<SubCategoryNameWrapper>
						<SubCategoryText>{props.subcategory.name}</SubCategoryText>
					</SubCategoryNameWrapper>
				)}

				{edit ? (
					<>
						<IconButton style={{ marginRight: '15px' }} aria-label="expand row" size="small" onClick={editSubcategory}>
							<DoneRoundedIcon />
						</IconButton>
						<IconButton
							style={{ marginRight: '15px' }}
							aria-label="expand row"
							size="small"
							onClick={toggleEnableEditSubcategory}>
							<ClearRoundedIcon />
						</IconButton>
					</>
				) : (
					<>
						<IconButton
							style={{ marginRight: '15px' }}
							aria-label="expand row"
							size="small"
							onClick={toggleEnableEditSubcategory}>
							<CreateOutlinedIcon />
						</IconButton>

						<IconButton aria-label="expand row" size="small" onClick={deleteSubCategory}>
							<DeleteOutlineOutlinedIcon />
						</IconButton>
					</>
				)}
			</SubCard>
		</div>
	);
};
