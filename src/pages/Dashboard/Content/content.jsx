import styled from 'styled-components';
import Header from '../../../components/Header';
import { Route, BrowserRouter as Router, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../../components/PrivateRoute';
import UserPage from '../UserPage';
import ProfilePage from '../ProfilePage';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	console.log('cp');
	console.log(useHistory());
	console.log(useLocation());
	const { path } = useRouteMatch();
	return (
		<ContentContainer>
			<Header />
			<Router>
				<Switch>
					<PrivateRoute exact path={`${path}/profile`}>
						<ProfilePage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}`}>
						<UserPage />
					</PrivateRoute>
				</Switch>
			</Router>
		</ContentContainer>
	);
}
