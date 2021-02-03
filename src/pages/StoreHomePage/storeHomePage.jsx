import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import ProductCard from '../../components/ProductCard';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ScrollToTop from '../../components/ScrollToTop';
import StoreFooter from '../../components/StoreFooter';
import Carousel from 'react-material-ui-carousel';
import Banner1 from '../../assets/Images/banner1.png';
import Banner2 from '../../assets/Images/banner2.png';
import Banner3 from '../../assets/Images/banner3.png';
import { useDispatch, useSelector } from 'react-redux';
import { onGetHomePageData } from '../../slices/storehomepage.slice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const BannerImage = styled.img`
	width: 100%;
	height: auto;
`;
const ProductsWrapper = styled.div`
	width: 1340px;
	padding: 0 25px;
	margin: 0 auto;
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
	cursor: pointer;
`;

export default function StoreHomePage(props) {
	const history = useHistory()
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

	const { homePageData } = useSelector((state) => state.homePageDataSlice);
	const dispatch = useDispatch();
	useEffect(() => {
		if (homePageData.length === 0) {
			dispatch(onGetHomePageData());
		}
	}, []);

	const seeMore = (e) => {
		console.log(e.target.dataset['name']);
		history.push(`/store-category?subCategory=${e.target.dataset['name']}`);
	};

	return (
		<div>
			<StoreHeader />
			<ScrollToTop />
			<Carousel indicators={false}>
				<BannerImage src={Banner1} />
				<BannerImage src={Banner2} />
				<BannerImage src={Banner3} />
			</Carousel>
			<ProductsWrapper>
				{homePageData.map((each) => (
					<NewCategoryWrapper className="cards" key={each.id + each.name}>
						<SectionHeadWrapper>
							<SectionHeading>{each.name}</SectionHeading>
							<SeeMore data-name={each.name} onClick={seeMore}>See more</SeeMore>
						</SectionHeadWrapper>
						<MultiCarousel {...MultiCarouselProps}>
							{each.Products.map((item) => (
								<ProductCard key={item.id + item.name} data={item} />
							))}
						</MultiCarousel>
					</NewCategoryWrapper>
				))}
			</ProductsWrapper>
			<StoreFooter />
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
