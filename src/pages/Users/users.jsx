import SideNavigation from '../../components/SideNavigation';
import Content from './Content';
import { useHistory } from 'react-router-dom';
/**---------------- Styles ------------------*/
const style = {
	display: 'flex',
	width: '100%',
};

export default function Users(props) {
	return (
		<div style={style}>
			<SideNavigation parentPage="users" />
			<Content />
		</div>
	);
}
