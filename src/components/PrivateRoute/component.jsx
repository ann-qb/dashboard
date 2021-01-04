import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, allowedRoles = [], ...rest }) {
	const { loggedIn } = useSelector((state) => state.loginSlice);
	const { role } = useSelector((state) => state.loginSlice);
	let authorised = true;
	if (allowedRoles.length !== 0) authorised = allowedRoles.find(role);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedIn ? (
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

function NoAccess() {
	return <p>You are not authorized to access this page!</p>;
}
