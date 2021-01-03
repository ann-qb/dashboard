import SideNavigation from './SideNavigation'
import Content from './Content'

export default function Dashboard(props) {
  const style ={
    width:'100%',
    display:'flex',
  }
	return (
		<div style={style}>
			<SideNavigation />
			<Content />
		</div>
	);
}
