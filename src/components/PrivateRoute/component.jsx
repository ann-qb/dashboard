import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated
// and displays NoAccess component if user is
// not authorized to access a page.
export default function PrivateRoute({ children, allowedRoles = [], ...rest }) {
	const { loggedUser } = useSelector((state) => state.loginSlice);
	const { role } = useSelector((state) => state.loginSlice);
	let authorised = true;
	if (allowedRoles.length !== 0) authorised = allowedRoles.includes(role);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedUser !== null ? (
					authorised ? (
						children
					) : (
						<NoAccess />
					)
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

// Component to display when access to a page is denied based on user's role
function NoAccess() {
	return <p>You are not authorized to access this page!</p>;
}
