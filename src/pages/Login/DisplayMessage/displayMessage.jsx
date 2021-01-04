import styled from 'styled-components';

/**---------------- Styles ------------------*/
const Card = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	display: flex;
	justify-content: center;
	width: 30%;
	padding: 20px 10px;
	transform: translate(-50%, -50%);
`;

export default function DisplayMessage(props) {
	return (
		<Card className="cards">
			<p>{props.message}</p>
		</Card>
	);
}
