import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import ProductCard from '../../components/ProductCard';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ScrollToTop from '../../components/ScrollToTop'
import StoreFooter from '../../components/StoreFooter'
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Carousel from 'react-material-ui-carousel';
import Banner1 from '../../assets/Images/banner1.png';
import Banner2 from '../../assets/Images/banner2.png';
import Banner3 from '../../assets/Images/banner3.png';

const CarouselWrapper = {
	backgroundColor: '#ff0000',
};

const BannerImage = styled.img`
	width:100%;
	height:auto;
`
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
	cursor:pointer;
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
		slidesToSlide: 2,
		swipeable: true,
	};
	return (
		<div>
			<StoreHeader />
			<ScrollToTop/>
			<Carousel indicators={false}>
				<BannerImage src={Banner1} />
				<BannerImage src={Banner2} />
				<BannerImage src={Banner3} />
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
			<StoreFooter/>
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
