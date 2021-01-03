import LoginCard from './LoginCards';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Login(props) {

	return (
		<div>
			<Header/>
			<LoginCard cardHeader="Username" cardType="text" buttonText="Next" />
			<Footer/>
		</div>
	);
}
