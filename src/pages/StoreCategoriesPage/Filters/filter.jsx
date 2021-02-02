import styled from 'styled-components';
import { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const FiltersWrapper = styled.div`
	width: 270px;
	height: 100%;
	margin: 0 5px;
`;
const SectionHeading = styled.p`
	font-size: 130%;
	color: #000;
`;
const SeparationLine = styled.hr`
  margin-top:10px;
  border:1px solid #eee;
`
const FilterBox = styled.div`
	width: 100%;
	height: fit-content;
	margin-top: 20px;
`;
const SubHeaders = styled.p`
	color: #000;
	font-size: 110%;
`;
const CheckBoxWrapper = styled.div`
	display: flex;
	align-items: center;
	color: #000;
`;
const PriceFieldContainer = styled.div`
  display:flex;
  justify-content:space-around;
  align-items: center;
  width:100%
  padding-left:10px;
`;

const PriceFieldWrapper = styled.div`
  width:40%;
  height:100%;
`

export default function Filter(props) {
	const [checked, setChecked] = useState(false);
	const [filterLowToHigh, setFilterLowToHigh] = useState(false);
	const [filterHighToLow, setFilterHighToLow] = useState(false);

	const handleLowToHigh = (event) => {
    setFilterHighToLow(false);
		setFilterLowToHigh(event.target.checked);
	};
	const handleHighToLow = (event) => {
    setFilterLowToHigh(false);
		setFilterHighToLow(event.target.checked);
  };
  
	return (
		<FiltersWrapper className="cards">
			<SectionHeading>Filters</SectionHeading>
			<SeparationLine />
			<FilterBox>
				<SubHeaders>Sorting</SubHeaders>
				<CheckBoxWrapper>
					<Checkbox
						color="primary"
						checked={filterLowToHigh}
						onChange={handleLowToHigh}
						inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
					/>
					<p>Price: Low - High</p>
				</CheckBoxWrapper>
				<CheckBoxWrapper>
					<Checkbox
						color="primary"
						checked={filterHighToLow}
						onChange={handleHighToLow}
						inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
					/>
					<p>Price: High - Low</p>
				</CheckBoxWrapper>
			</FilterBox>

			<FilterBox>
				<SubHeaders>Price Range</SubHeaders>
				<PriceFieldContainer>
					<PriceFieldWrapper>
						<TextField id="standard-basic" label="Min price" />
					</PriceFieldWrapper>
					<p style={{ margin: '15px 10px 0 10px' }}>to</p>
					<PriceFieldWrapper>
						<TextField id="standard-basic" label="Max price" />
					</PriceFieldWrapper>
				</PriceFieldContainer>
			</FilterBox>
		</FiltersWrapper>
	);
}
