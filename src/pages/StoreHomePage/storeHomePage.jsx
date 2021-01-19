import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import ProductCard from '../../components/ProductCard';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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

const ProductsWrapper = styled.div`
	width: 100%;
	padding: 0 25px;
`;
const NewCategoryWrapper = styled.div`
	width: 100%;
	height: fit-content;
	padding: 10px;
	margin: 20px 0;
`;
const SectionHeadWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;
const SectionHeading = styled.p`
	font-size: 130%;
	font-weight: 500;
	color: #000;
`;
const SeeMore = styled.p`
	color: #5673e8;
	font-size: 90%;
`;

export default function StoreHomePage(props) {
	// Multi Carousel props
	const MultiCarouselProps = {
		additionalTransfrom: 0,
		arrows: true,
		autoPlaySpeed: 3000,
		centerMode: false,
		containerClass: 'container-with-dots',
		draggable: true,
		focusOnSelect: false,
		infinite: true,
		keyBoardControl: true,
		minimumTouchDrag: 80,
		renderButtonGroupOutside: false,
		renderDotsOutside: false,
		responsive: responsive,
		showDots: false,
		slidesToSlide: 1,
		swipeable: true,
	};
	return (
		<div>
			<StoreHeader />
			<Carousel indicators={false}>
				<BannerOne />
				<BannerTwo />
				<BannerThree />
			</Carousel>
			<ProductsWrapper>
				<NewCategoryWrapper className="cards">
					<SectionHeadWrapper>
						<SectionHeading>New Products</SectionHeading>
						<SeeMore>See more</SeeMore>
					</SectionHeadWrapper>
					<MultiCarousel {...MultiCarouselProps}>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</MultiCarousel>
				</NewCategoryWrapper>

				<NewCategoryWrapper className="cards">
					<SectionHeadWrapper>
						<SectionHeading>Cloths</SectionHeading>
						<SeeMore>See more</SeeMore>
					</SectionHeadWrapper>
					<MultiCarousel {...MultiCarouselProps}>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</MultiCarousel>
				</NewCategoryWrapper>

				<NewCategoryWrapper className="cards">
					<SectionHeadWrapper>
						<SectionHeading>Electronics</SectionHeading>
						<SeeMore>See more</SeeMore>
					</SectionHeadWrapper>
					<MultiCarousel {...MultiCarouselProps}>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</MultiCarousel>
				</NewCategoryWrapper>
			</ProductsWrapper>
		</div>
	);
}

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 5,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};
