import SideNavigation from '../../components/SideNavigation';
import Content from './Content';

const style = {
	display: 'flex',
	width: '100%',
};

export default function Dashboard(props) {
	return (
		<div style={style}>
			<SideNavigation parentPage="profilePage" />
			<Content />
		</div>
	);
}
