import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function ShowIfAuth(props) {
	// const { role } = useSelector((state) => state.loginSlice);
	const allowedRoles = ['ADMIN'];

	return allowedRoles.includes(props.role) ? props.children : null;
}
