import styled from 'styled-components';
const ProductCardWrapper = styled.div`
	height: 290px;
	width: 250px;
	margin: ${(props) => (props.margin ? props.margin : '0')};
	padding: 5px;
	border: 1px solid #eee;
	border-radius: 5px;
	background-image: linear-gradient(to right, #f2f2f2 0%, rgba(229, 229, 229, 0.8) 20%, #f2f2f2 50%, #f2f2f2 100%);
	animation: shine 1s infinite ease-out;
`;

export default function ProductCardPreLoader(props) {
	let count = 1;
	let cards = [];
	if (props.cardCount) {
		count = parseInt(props.cardCount);
	}

	for (let i = 0; i < count; i++) {
		cards.push(i);
	}

	return (
		<>
			{cards.map((each) => (
				<ProductCardWrapper key={each} margin={props.margin} />
			))}
		</>
	);
}
