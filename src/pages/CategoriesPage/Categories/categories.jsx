import CategoryCard from './CategoryCards';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAddCategory, onGetCategoryList } from '../../../slices/categorylist.slice';
import { BounceLoader } from 'react-spinners';
import AlertPopup from '../../../components/Popups/AlertPopups';
import IconButton from '@material-ui/core/IconButton';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
	addIcon: {
		color: '#5673E8',
	},
}));

const useIconButtonStyles = makeStyles({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		padding: '0 30px',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		'&$disabled': {
			background: 'rgba(0, 0, 0, 0.12)',
			color: 'white',
			boxShadow: 'none',
		},
	},
	disabled: {},
});

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const AddCategoryWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	padding-left: 0;
	margin-top: 15px;
	margin-bottom: 5px;
`;

const Input = styled.input`
	height: 100%;
	padding: 8px;
	margin-right: 15px;
	border: 0.2px solid #dcdde2;
`;

const SpinnerDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 200px;
	margin: auto 0;
`;

export default function Categories(props) {
	const classes = useStyles();
	// States for search and filter

	const { categoryList, status } = useSelector((state) => state.categoryListSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		if (categoryList.length === 0) {
			dispatch(onGetCategoryList());
		}
		if (categoryList.length === 0 && status === 'loading category list') {
			setShowLoading(true);
		} else if (status === 'loading category list over') {
			setShowLoading(false);
		}
	}, []);

	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		if (status === 'loading category list over') {
			setNewCategory('');
			setDisableInput(false);
		}
	}, [status]);

	const showAlertPopup = () => {
		setAlertDisplay(true);
	};

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}

	const [disableInput, setDisableInput] = useState(false);
	const [disableAdd, setDisableAdd] = useState(true);
	const [newCategory, setNewCategory] = useState('');

	useEffect(() => {
		newCategory.trim().length !== 0 ? setDisableAdd(false) : setDisableAdd(true);
	}, [newCategory]);

	const handleInputChange = (e) => {
		setNewCategory(e.target.value);
	};

	const addNewCategory = () => {
		setDisableInput(true);
		dispatch(onAddCategory({ category: newCategory }));
		console.log({ category: newCategory });
	};

	return (
		<PageContainer>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />

			<p className="pageHeaders blackFont">Categories</p>
			<AddCategoryWrapper>
				<Input placeholder="Add Category" onChange={handleInputChange} value={newCategory} disabled={disableInput} />
				{disableInput ? (
					<div className={classes.root}>
						<CircularProgress size={20} />
					</div>
				) : (
					<>
						{disableAdd ? (
							<IconButton aria-label="expand row" size="small">
								<AddBoxRoundedIcon color="disabled" fontSize="large" />
							</IconButton>
						) : (
							<IconButton aria-label="expand row" size="small" disabled={disableAdd} onClick={addNewCategory}>
								<AddBoxRoundedIcon className={classes.addIcon} fontSize="large" />
							</IconButton>
						)}
					</>
				)}
			</AddCategoryWrapper>
			{showLoading ? (
				<SpinnerDiv>
					<BounceLoader size={100} color={'#5673E8'} loading={showLoading} />
				</SpinnerDiv>
			) : props.searchValue ? (
				categoryList
					.filter((category) => category.name.toLowerCase().includes(props.searchValue.toLowerCase()))
					.map((each) => <CategoryCard key={each.id + each.name} category={each} />)
			) : (
				categoryList.map((each) => <CategoryCard key={each.id + each.name} category={each} />)
			)}
		</PageContainer>
	);
}
