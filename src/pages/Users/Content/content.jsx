import styled from 'styled-components';
import { useState } from 'react';
import Header from '../../../components/Header';
import { Route, BrowserRouter as Router, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import UserPage from '../UserPage';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	const [searchValue, setSearchValue] = useState('');

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};
	const { path } = useRouteMatch();
	return (
		<ContentContainer>
			<Header value={searchValue} onChange={handleSearchChange} />
			<UserPage searchValue={searchValue} />
		</ContentContainer>
	);
}
