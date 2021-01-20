import CategoryCard from './CategoryCards';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAddCategory, onGetCategoryList } from '../../../slices/categorylist.slice';
import { BounceLoader } from 'react-spinners';
import AlertPopup from '../../../components/Popups/AlertPopups';
import AddIcon from '@material-ui/icons/Add';

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const AddCategoryWrapper = styled.div`
	display:flex;
	align-item:center;
	padding: 10px;
	padding-left: 0;
	margin-top: 15px;
	margin-bottom: 5px;
`;
const Button = styled.button`
	height: 100%;
	padding:0 !important;
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

// const categoriesArray = [
// 	{
// 		id: 0,
// 		name: 'Electronics',
// 		subcategories: [
// 			{
// 				id: 0,
// 				name: 'Mobile Accessories',
// 				category: 0,
// 			},
// 			{
// 				id: 1,
// 				name: 'Computer Peripherals',
// 				category: 0,
// 			},
// 			{
// 				id: 2,
// 				name: 'Laptop Accessories',
// 				category: 0,
// 			},
// 			{
// 				id: 3,
// 				name: 'Tablets',
// 				category: 0,
// 			},
// 		],
// 	},
// 	{
// 		id: 1,
// 		name: 'Fashion',
// 		subcategories: [
// 			{
// 				id: 0,
// 				name: 'Jeans',
// 				category: 1,
// 			},
// 			{
// 				id: 1,
// 				name: 'T-shirts',
// 				category: 1,
// 			},
// 			{
// 				id: 2,
// 				name: 'Dresses',
// 				category: 1,
// 			},
// 			{
// 				id: 3,
// 				name: 'Caps',
// 				category: 1,
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		name: 'Grocery',
// 		subcategories: [],
// 	},
// 	{
// 		id: 3,
// 		name: 'Mobiles',
// 		subcategories: [],
// 	},
// ];

export default function Categories() {
	const { categoryList, status } = useSelector((state) => state.categoryListSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(onGetCategoryList());
	}, []);

	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		if (status === 'loading category list') {
			setShowLoading(true);
		} else if (status === 'loading category list over') {
			setShowLoading(false);
		}
		// status === 'loading' ? setShowPopupLoading(true) : setShowPopupLoading(false);
	}, [status]);

	// useEffect(() => {
	// 	if (!addUserPopup && status === 'add user success') {
	// 		setAlertType('success');
	// 		setAlertMessage('User added successfully!');
	// 		showAlertPopup();
	// 	} else if (!addUserPopup && status === 'add user failed') {
	// 		setAlertType('error');
	// 		setAlertMessage('Could not add user');
	// 		showAlertPopup();
	// 	}
	// }, [addUserPopup, status]);

	// useEffect(() => {
	// 	if (status === 'delete user success') {
	// 		setAlertType('success');
	// 		setAlertMessage('User deleted successfully!');
	// 		showAlertPopup();
	// 	} else if (status === 'delete user failed') {
	// 		setAlertType('error');
	// 		setAlertMessage('Could not delete user');
	// 		showAlertPopup();
	// 	}
	// }, [status]);

	const showAlertPopup = () => {
		setAlertDisplay(true);
		// setAddUserPopup(false);
	};

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}

	const [disableAdd, setDisableAdd] = useState(true);
	const [newCategory, setNewCategory] = useState('');

	useEffect(() => {
		newCategory.trim().length !== 0 ? setDisableAdd(false) : setDisableAdd(true);
	}, [newCategory]);

	const handleInputChange = (e) => {
		setNewCategory(e.target.value);
	};

	const addNewCategory = () => {
		dispatch(onAddCategory({ category: newCategory }));
		console.log({ category: newCategory });
	};

	return (
		<PageContainer>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />

			<p className="pageHeaders blackFont">Categories</p>
			<AddCategoryWrapper>
				<Input placeholder="Category" onChange={handleInputChange} />
				<Button className="button-primary" disabled={disableAdd} onClick={addNewCategory}>
					<AddIcon/>
				</Button>
			</AddCategoryWrapper>
			{showLoading ? (
				<SpinnerDiv>
					<BounceLoader size={100} color={'#5673E8'} loading={showLoading} />
				</SpinnerDiv>
			) : (
				categoryList.map((each) => <CategoryCard key={each.id + each.name} category={each} />)
			)}
		</PageContainer>
	);
}

/* {categoriesArray.reverse().map((each) => (
				<CategoryCard key={each.id + each.name} category={each} />
			))} */
