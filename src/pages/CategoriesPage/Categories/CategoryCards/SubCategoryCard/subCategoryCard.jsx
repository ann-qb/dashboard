import styled from 'styled-components';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const SubCard = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 10px 10px;
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
	${'' /* border: none; */}
	height: 100%;
	padding: 8px;
	margin-right: 15px;
	border: 0.2px solid #dcdde2;
`;

const DisabledDiv = styled.div`
	${'' /* position: absolute; */}
	height: 100%;
	width: 100%;
	z-index: 1;
	background-color: #ddd;
	opacity: 0.3;
	display: ${(props) => (props.disable ? 'block' : 'none')};
	cursor: default;
`;

export default function SubCategoryCard(props) {
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
				// dispatch(
				// 	onEditSubCategory({
				// 		subcategory: editedSubcategory,
				// 		subcategoryId: props.subcategory.id,
				// 		parentCategoryId: props.subcategory.category,
				// 	})
				// );
			}
			// setEdit(false);
		}
	};

	const editSubcategory = () => {
		if (editedSubcategory.trim().length !== 0) {
			setDisableInput(true);
			// dispatch(
			// 	onEditSubCategory({
			// 		subcategory: editedSubcategory,
			// 		subcategoryId: props.subcategory.id,
			// 		parentCategoryId: props.subcategory.category,
			// 	})
			// );
			console.log({
				subcategory: editedSubcategory,
				subcategoryId: props.subcategory.id,
				parentCategoryId: props.subcategory.category,
			});
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
		// dispatch(
		// 	onDeleteSubCategory({
		// 		subcategory: props.subcategory.name,
		// 		subcategoryId: props.subcategory.id,
		// 		parentCategoryId: props.subcategory.category,
		// 	})
		// );
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
}
