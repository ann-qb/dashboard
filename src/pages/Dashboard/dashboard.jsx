import SideNavigation from './SideNavigation';
import Content from './Content';
/**---------------- Styles ------------------*/
const style = {
	display: 'flex',
	width: '100%',
};

export default function Dashboard(props) {
	return (
		<div style={style}>
			<SideNavigation parentPage="dashboard" />
			<Content />
		</div>
	);
}
