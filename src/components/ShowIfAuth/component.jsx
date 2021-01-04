import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function ShowIfAuth({ children, allowedRoles, redirectToAccessDeniedPage, ...rest }) {
	const { loggedIn } = useSelector((state) => state.loginSlice);
	// const { role } = useSelector((state) => state.loginSlice);
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
