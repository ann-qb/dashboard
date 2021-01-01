import { createGlobalStyle } from 'styled-components';

/**------ Colors ------*/
const PRIMARY_PURPLE = '#5673E8',
	FADED_PURPLE = '#d6dcf9';
const PRIMARY_DARK = '#343a40',
	FADED_DARK = '#eccecf';
const SECONDARY_DARK = '#74788d',
	FADED_SECONDARY_DARK = '#dcdde2';
const GREEN = '34c38f',
	FADED_GREEN = '#ccf0e8';
const BLUE = '#50a5f1',
	FADED_BLUE = '#d3e8fb';
const YELLOW = 'f1b44c',
	FADED_YELLOW = '#Fbecd2';
const RED = '#f46a6a',
	FADED_RED = '#fcdada';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
    background-color: #fff;
    color: #464648;
    font-size: 18px;
    text-rendering: optimizeLegibility;
  }

  /* Hide scrollbar */
  ::-webkit-scrollbar{
    width: 0px;
    background: transparent;
  }

  h1,h2,h3,h4,h5{
    font-family: 'Poppins', sans-serif;
  }

  p,a,button{
    font-family: 'PT Serif', serif;
  }
`;

export default GlobalStyle;
