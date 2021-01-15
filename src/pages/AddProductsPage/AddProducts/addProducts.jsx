import styled from 'styled-components';
import { useState } from 'react';
import ImageUploader from 'react-images-upload';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles({
	textField: {
		width: '100%',
	},
	leftButton: {
		marginRight: '15px',
	},
	button: {
		backgroundColor: '#5673E8',
	},
});

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const FlexWrapper = styled.div`
	display: flex;
	height: 100%;
	justify-content: space-between;
	padding: 0;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 90%;
	margin-top: 20px;
	padding: 10px 25px;
	overflow: scroll;
`;
const FormHeader = styled.p`
	margin-bottom: 20px;
	font-size: 120%;
	color: #000;
`;
const MainGroup = styled.div`
	display: flex;
	// flex-direction: column;
	justify-content: space-between;
	width: 100%;
`;
const ItemGroup = styled.div`
	width: 49%;
	margin-bottom: 15px;
`;
const FullWidthItemGroup = styled.div`
	width: 100%;
	height: fit-content;
`;
const PreviewWrapper = styled.div`
	width: 49%;
	height: 90%;
	margin-top: 20px;
	padding: 10px 25px;
	overflow: scroll;
`;
const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	width: fit-content;
	margin: 20px auto;
`;

const ImagePlaceHolder = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:30%;
  
`

const CATAGORIES = [
	{ name: 'Cloths', id: 1 },
	{ name: 'Food', id: 2 },
	{ name: 'Medicines', id: 3 },
	{ name: 'Electronics', id: 4 },
];

export default function AddProducts(props) {
	const classes = useStyle();
	const [category, setCategory] = useState(null);
	const [subCategory, setSubCategory] = useState(null);
	const [picture, setPicture] = useState([]);

	const saveCategory = (e) => {
		setCategory(e.target.value);
	};
	const saveSubCategory = (e) => {
		setSubCategory(e.target.value);
	};

	const onDrop = (picture) => {
		setPicture([...picture]);
	};

	return (
		<PageContainer>
			<p className="pageHeaders blackFont">Add Products</p>
			<FlexWrapper>
				<Form className="cards">
					<FormHeader>Details</FormHeader>
					<MainGroup>
						<ItemGroup>
							<TextField
								className={classes.textField}
								label="Product Name"
								variant="outlined"
								color="#5673E8"
								required
							/>
						</ItemGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Brand" variant="outlined" color="#5673E8" />
						</ItemGroup>
					</MainGroup>
					<MainGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Price" variant="outlined" color="#5673E8" required />
						</ItemGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Discount Percentage" variant="outlined" color="#5673E8" />
						</ItemGroup>
					</MainGroup>

					<MainGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Status" variant="outlined" color="#5673E8" required />
						</ItemGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Quantity" variant="outlined" color="#5673E8" required />
						</ItemGroup>
					</MainGroup>
					<MainGroup>
						<ItemGroup>
							<TextField
								className={classes.textField}
								label="Category"
								variant="outlined"
								select
								onChange={saveCategory}
								value={category}
								color="#5673E8"
								required
							>
								{CATAGORIES.map((item) => (
									<MenuItem key={item.id} value={item.name}>
										{item.name}
									</MenuItem>
								))}
							</TextField>
						</ItemGroup>
						{category ? (
							<ItemGroup>
								<TextField
									className={classes.textField}
									label="Sub Category"
									variant="outlined"
									select
									onChange={saveSubCategory}
									value={subCategory}
									color="#5673E8"
									required
								>
									<MenuItem value="Value 1">Value 1</MenuItem>
									<MenuItem value="Value 2">Value 2</MenuItem>
								</TextField>
							</ItemGroup>
						) : null}
					</MainGroup>
					<MainGroup>
						<FullWidthItemGroup>
							<TextField
								className={classes.textField}
								label="Description"
								variant="outlined"
								color="#5673E8"
								multiline
								rowsMax={4}
								required
							/>
						</FullWidthItemGroup>
					</MainGroup>

					<ButtonGroup>
						<Button className={classes.leftButton} variant="outlined" color="primary">
							cancel
						</Button>
						<Button variant="contained" color="primary" disableElevation>
							Submit
						</Button>
					</ButtonGroup>
				</Form>

				<PreviewWrapper className="cards">
					<FormHeader>Upload Image</FormHeader>

					{picture[0] ? (
						<ImagePlaceHolder>
							{picture.map((each) => {
								const tt = URL.createObjectURL(each);
								return <img src={tt} alt="preview" />;
							})}
						</ImagePlaceHolder>
					) : (
						<ImagePlaceHolder />
					)}

					<ImageUploader
						className="uploadCard"
						withIcon={true}
						onChange={onDrop}
						imgExtension={['.jpg', '.png']}
						label="Max file size: 5MB, Accepted: jpg, png"
						maxFileSize={5242880}
						buttonClassName="imageUploadBtn"
						singleImage={true}
						buttonText="Choose Image"
					/>
				</PreviewWrapper>
			</FlexWrapper>
		</PageContainer>
	);
}
/**
 * const useStyle = makeStyles({
	textField: {
		width: '100%',
		'&:hover': { width: '500px' },
	},
});<div style={{display:"flex",flexDirection:'column',alignItems:'center',justifyContents:'center'}}>
 */
