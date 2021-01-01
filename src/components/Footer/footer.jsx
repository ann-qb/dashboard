import styled from 'styled-components';

export default function Footer(){

  const FooterBar = styled.div`
    position:absolute;
    display:flex;
		height: 5vh;
		background-color: #fff;
		width: 100%;
		box-shadow: 1px 0 10px rgba(0, 0, 0, 0.2);
		justify-content: space-between;
    align-items: center;
    bottom:0;
    left:0;
  `;
  
  const FooterText = styled.p`
    margin-left: 30px;
    font-size:70%;
  `

  return (
		<FooterBar>
			<FooterText>&#169; 2021. Made by Ann & Thejus</FooterText>
		</FooterBar>
	);
}