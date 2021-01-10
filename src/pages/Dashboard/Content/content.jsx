import styled from 'styled-components';
import Header from '../../../components/Header';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from '../../../components/PrivateRoute';
import UserPage from '../UserPage';
import ProfilePage from '../ProfilePage';

/**---------------- Styles ------------------*/
const ContentContainer = styled.div`
	width: 100%;
`;
export default function Content() {
	return (
		<ContentContainer>
			<Header />
			<Router>
				<Switch>
					<PrivateRoute exact path="/dashboard">
						<UserPage />
					</PrivateRoute>
					<PrivateRoute exact path="/dashboard/profile">
						<ProfilePage />
					</PrivateRoute>
				</Switch>
			</Router>
		</ContentContainer>
	);
}
