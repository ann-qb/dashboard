import { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import ProductsList from '../ProductsList';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	const [searchValue, setSearchValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const handleSearchInputChange = (e) => {
		setSearchValue(e.target.value);
	};
	const keyPress = (e) => {
		if (e.key === 'Enter') {
			setSearchTerm(searchValue);
		}
	};
	return (
		<ContentContainer>
			<Header value={searchValue} onChange={handleSearchInputChange} onKeyDown={keyPress} />
			<ProductsList searchTerm={searchTerm} />
		</ContentContainer>
	);
}
