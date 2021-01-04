import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function ShowIfAuth(props) {
	// const { role } = useSelector((state) => state.loginSlice);
	const allowedRoles = ['ADMIN'];

	if (allowedRoles.includes(props.role)) return props.children;
}
