import styled from 'styled-components';
import { useState } from 'react';
import DeleteConfirmPopup from '../../../../components/Popups/DeleteConfirmPopup';
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
import { useDispatch, useSelector } from 'react-redux';
import {
	onAddSubCategory,
	onDeleteCategory,
	onDeleteSubCategory,
	onEditCategory,
	onEditSubCategory,
} from '../../../../slices/categorylist.slice';
import SubCategoryCard from './SubCategoryCard/subCategoryCard';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const Card = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;

	margin-top: 10px;
	// padding: 10px 10px;
	padding: ${(props) => (props.removeLeftPadding ? '10px 0' : '10px 10px')};
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
	display: flex;
	align-items: center;
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

const DisabledDiv = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 10px 10px;
	z-index: 1;
	background-color: #ddd;
	opacity: 1;
	display: ${(props) => (props.disable ? 'block' : 'none')};
	cursor: default;
`;
const SubCategoryCount = styled.p`
	height: fit-content;
	width: fit-content;
	margin-left: 15px;
	padding: 0 8px;
	font-size: 90%;
	background-color: #5673e8;
	color: #fff;
	border-radius: 5px;
`;

export default function CategoryCard(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { status } = useSelector((state) => state.categoryListSlice);

	const [open, setOpen] = useState(false);
	const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);

	//----------------------Add new subcategory functionality----------------------//
	const [newSubCategory, setNewSubCategory] = useState('');
	const [disableAdd, setDisableAdd] = useState(true);
	const [disableAddNewSubCategory, setDisableAddNewSubCategory] = useState(false);

	useEffect(() => {
		if (!open) setNewSubCategory('');
	}, [open]);

	useEffect(() => {
		newSubCategory.trim().length !== 0 ? setDisableAdd(false) : setDisableAdd(true);
	}, [newSubCategory]);

	useEffect(() => {
		if (status === 'add subcategory loading') {
			setDisableAddNewSubCategory(true);
		} else if (status === 'add subcategory success' || status === 'add subcategory failed') {
			setNewSubCategory('');
			setDisableAddNewSubCategory(false);
		}
	}, [status]);

	const handleInputChange = (e) => {
		setNewSubCategory(e.target.value);
	};

	const cancelAddNewSubCategory = () => {
		setNewSubCategory('');
	};

	const addNewSubCategory = () => {
		dispatch(onAddSubCategory({ subcategory: newSubCategory, parentCategory: props.category.name }));
	};

	//----------------Edit/ Delete category functionality--------------------------//
	const [edit, setEdit] = useState(false);
	const [editedCategory, setEditedCategory] = useState(props.category.name);
	const [disableInput, setDisableInput] = useState(false);
	const [disableDiv, setDisableDiv] = useState(false);

	const handleEditCategoryInputChange = (e) => {
		setEditedCategory(e.target.value);
	};

	const keyPress = (e) => {
		if (e.key === 'Enter') {
			console.log('enter pressed');
			if (editedCategory.trim().length !== 0) {
				setDisableInput(true);
				dispatch(
					onEditCategory({
						category: editedCategory,
						categoryId: props.category.id,
					})
				);
			}
			console.log({
				category: editedCategory,
				categoryId: props.category.id,
			});
			// setEdit(false);
		}
	};

	const editCategory = () => {
		if (editedCategory.trim().length !== 0) {
			setDisableInput(true);
			dispatch(
				onEditCategory({
					category: editedCategory,
					categoryId: props.category.id,
				})
			);
		}
		// setEdit(false);
	};

	const toggleEnableEditCategory = () => {
		edit ? setEdit(false) : setEdit(true);
		setEditedCategory(props.category.name);
	};

	// const resetEditSubcategory = () => {
	// 	setEditedSubcategory('');
	// };

	// const cancelEditSubcategory = () => {
	// 	setEditedSubcategory(props.subcategory.name);
	// };

	const openDeleteConfirmationModal =()=>{
		setDeletePopupIsOpen(true);
	}

	const deleteCategory = () => {
		setDeletePopupIsOpen(false);
		dispatch(
			onDeleteCategory({
				categoryId: props.category.id,
			})
		);
		console.log({
			category: props.category.name,
			categoryId: props.category.id,
		});
		setDisableDiv(true);
	};

	const closeDeleteModal = () => {
		setDeletePopupIsOpen(false);
	};

	return (
		<>
			<Card removeLeftPadding={disableDiv}>
				<DisabledDiv disable={disableDiv}>
					<p>Hold on.... Just a second.</p>
				</DisabledDiv>
				<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>

				{edit ? (
					<CategoryNameWrapper>
						<Input
							value={editedCategory}
							onChange={handleEditCategoryInputChange}
							onKeyDown={keyPress}
							disabled={disableInput}
							autoFocus
						/>
						{disableInput ? (
							<div className={classes.root}>
								<CircularProgress size={20} />
							</div>
						) : null}
					</CategoryNameWrapper>
				) : (
					<CategoryNameWrapper>
						<CategoryText>{props.category.name}</CategoryText>
						{open ? null : <SubCategoryCount>{props.category.Subcategories.length}</SubCategoryCount>}
					</CategoryNameWrapper>
				)}

				{edit ? (
					<>
						<IconButton style={{ marginRight: '15px' }} aria-label="expand row" size="small" onClick={editCategory}>
							<DoneRoundedIcon />
						</IconButton>
						<IconButton
							style={{ marginRight: '15px' }}
							aria-label="expand row"
							size="small"
							onClick={toggleEnableEditCategory}
						>
							<ClearRoundedIcon />
						</IconButton>
					</>
				) : (
					<>
						<IconButton
							style={{ marginRight: '15px' }}
							aria-label="expand row"
							size="small"
							onClick={toggleEnableEditCategory}
						>
							<CreateOutlinedIcon />
						</IconButton>

						<IconButton aria-label="expand row" size="small" onClick={openDeleteConfirmationModal}>
							<DeleteOutlineOutlinedIcon />
						</IconButton>
					</>
				)}
			</Card>

			<Collapse style={{ backgroundColor: '#fff' }} in={open} timeout="auto" unmountOnExit>
				<SeparationLine />
				<AddSubCategoryWrapper>
					<Input
						value={newSubCategory}
						onChange={handleInputChange}
						// onBlur={cancelAddNewSubCategory}
						disabled={disableAddNewSubCategory}
						placeholder="Sub Category"
					/>
					{disableAddNewSubCategory ? (
						<div className={classes.root}>
							<CircularProgress size={20} />
						</div>
					) : (
						<Button disabled={disableAdd} className="button-primary" onClick={addNewSubCategory}>
							Add
						</Button>
					)}
				</AddSubCategoryWrapper>
				{props.category.Subcategories.map((each) => (
					<SubCategoryCard key={each.id + each.name} subcategory={each} />
				))}
			</Collapse>
			<DeleteConfirmPopup
				id={props.category.id}
				isOpen={deletePopupIsOpen}
				onDelete={deleteCategory}
				onRequestClose={closeDeleteModal}
			/>
		</>
	);
}
