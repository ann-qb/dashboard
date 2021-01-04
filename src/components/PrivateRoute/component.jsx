import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, ...rest }) {
	const { loggedIn } = useSelector((state) => state.loginSlice);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedIn ? (
					children
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
