import styled from 'styled-components'

export default function DisplayMessage(props) {

	const Card = styled.div`
		width: 30%;
		display:flex;
		justify-content:center;
		position: absolute;
		padding: 20px 10px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`;

	return (
		<Card className="cards">
			<p>{props.message}</p>
		</Card>
	);
}
