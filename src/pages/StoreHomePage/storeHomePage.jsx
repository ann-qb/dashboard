import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import Banner1 from '../../assets/Images/banner1.jpg';
import Banner2 from '../../assets/Images/banner2.jpg';
import Banner3 from '../../assets/Images/banner3.jpg';

const CarouselWrapper = {
	backgroundColor: '#ff0000',
};

const BannerOne = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 400px;
	width: 100%;
	background-image: url(${Banner1});
	background-position: center;
	background-size: cover;
`;
const BannerTwo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 400px;
	width: 100%;
	background-image: url(${Banner2});
	background-position: center;
	background-size: cover;
`;
const BannerThree = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 400px;
	width: 100%;
	background-image: url(${Banner3});
	background-position: center;
	background-size: cover;
`;

export default function StoreHomePage(props) {
	return (
		<>
			<StoreHeader />
			<Carousel indicators={false}>
				<BannerOne />
				<BannerTwo />
				<BannerThree />
			</Carousel>
			<div>
				<p>Hello</p>
			</div>
		</>
	);
}

// function Item(props) {
// 	return (
// 		<Banner>
// 			<h2>{props.item.name}</h2>
// 			<p>{props.item.description}</p>

// 			<Button className="CheckButton">Check it out!</Button>
// 		</Banner>
// 	);
// }
/**
 * {items.map((item, i) => (
					<Item key={i} item={item} />
				))}
 */
