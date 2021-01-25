import styled from 'styled-components';
import {useState} from 'react'
import Header from '../../../components/Header';
import Categories from '../Categories';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	const [searchValue, setSearchValue] = useState(null);

	const handleSearchChange =(e)=>{
		setSearchValue(e.target.value)
		console.log(searchValue)
	}
	return (
		<ContentContainer>
			<Header value={searchValue} onChange={handleSearchChange} />
			<Categories searchValue={searchValue} />
		</ContentContainer>
	);
}