import SideNavigation from '../../components/SideNavigation';
import Content from './Content';

/**---------------- Styles ------------------*/
const style = {
	display: 'flex',
	width: '100%',
};

export default function ProductListingPage(props) {
	return (
		<div style={style}>
			<SideNavigation parentPage="add_products" />
			<Content />
		</div>
	);
}
