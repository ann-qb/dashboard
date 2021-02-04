import styled from 'styled-components';
import { useState } from 'react';
import DeleteConfirmPopup from '../../../../../components/Popups/DeleteConfirmPopup';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { useDispatch, useSelector } from 'react-redux';
import { onDeleteSubCategory, onEditSubCategory } from '../../../../../slices/categorylist.slice';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const SubCard = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	padding: ${(props) => (props.disablePadding ? '10px 0' : '10px 10px')};
	margin-bottom: 2px;
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

const SubCategoryInput = styled.input`
	height: 100%;
	padding: 8px;
	margin-right: 15px;
	border: 0.2px solid #dcdde2;
`;

const DisabledDiv = styled.div`
	position: absolute;
	align-items: center;
	height: 100%;
	width: 100%;
	z-index: 1;
	background-color: #ddd;
	padding: 10px 10px;
	display: ${(props) => (props.disable ? 'flex' : 'none')};
	cursor: default;
`;

export default function SubCategoryCard(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { status } = useSelector((state) => state.categoryListSlice);

	const [edit, setEdit] = useState(false);
	const [disableInput, setDisableInput] = useState(false);
	const [disableDiv, setDisableDiv] = useState(false);
	const [editedSubcategory, setEditedSubcategory] = useState(props.subcategory.name);
	const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);

	useEffect(() => {
		if (status === 'edit subcategory loading') {
		} else if (status === 'edit subcategory failed') {
			setEdit(false);
			setDisableInput(false);
		} else if (status === 'loading category list success') {
			setEdit(false);
			setDisableInput(false);
		}
	}, [status]);

	const handleInputChange = (e) => {
		setEditedSubcategory(e.target.value);
	};

	const keyPress = (e) => {
		if (e.key === 'Enter') {
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
		setDeletePopupIsOpen(false);
		dispatch(
			onDeleteSubCategory({
				subcategoryId: props.subcategory.id,
			})
		);
		setDisableDiv(true);
	};

	const openDeleteConfirmationModal = () => {
		setDeletePopupIsOpen(true);
	};

	const closeDeleteModal = () => {
		setDeletePopupIsOpen(false);
	};

	return (
		<div>
			<SubCard disablePadding={disableDiv}>
				<DisabledDiv disable={disableDiv}>
					<CircularProgress size={20} />
					<p style={{ marginLeft: '30px' }}>Hold on.... </p>
				</DisabledDiv>
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
						{disableInput ? null : (
							<>
								<IconButton
									style={{ marginRight: '15px' }}
									aria-label="expand row"
									size="small"
									onClick={editSubcategory}>
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
						)}
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

						<IconButton aria-label="expand row" size="small" onClick={openDeleteConfirmationModal}>
							<DeleteOutlineOutlinedIcon />
						</IconButton>
					</>
				)}
			</SubCard>
			<DeleteConfirmPopup
				id={props.subcategory.id}
				isOpen={deletePopupIsOpen}
				customMessage="You are about to delete all products under this subcategory."
				onDelete={deleteSubCategory}
				onRequestClose={closeDeleteModal}
			/>
		</div>
	);
}
