import styled from 'styled-components';

/**---------------- Styles ------------------*/
const FooterBar = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 5vh;
	width: 100%;
	background-color: #fff;
	box-shadow: 1px 0 10px rgba(0, 0, 0, 0.2);
`;

const FooterText = styled.p`
	margin-left: 30px;
	font-size: 70%;
`;

export default function Footer() {
	return (
		<FooterBar>
			<FooterText>&#169; 2021. Made by Ann & Thejus</FooterText>
		</FooterBar>
	);
}
