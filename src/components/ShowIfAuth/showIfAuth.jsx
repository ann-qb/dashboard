import { useSelector } from 'react-redux';

export default function ShowIfAuth(props) {
	console.log(props)
	const { role } = useSelector((state) => state.loginSlice);
	return props.allowedRoles.includes(role) ? props.children : null;
}
