import { createGlobalStyle } from 'styled-components';
import LoginBackdrop from '../assets/Images/backdrop.png'

/**------ Colors ------*/
const PRIMARY_PURPLE = '#5673E8',
	FADED_PURPLE = '#d6dcf9';
const PRIMARY_DARK = '#343a40',
	FADED_DARK = '#eccecf';
const SECONDARY_DARK = '#74788d',
	FADED_SECONDARY_DARK = '#dcdde2';
const GREEN = '#34c38f',
	FADED_GREEN = '#ccf0e8';
const BLUE = '#50a5f1',
	FADED_BLUE = '#d3e8fb';
const YELLOW = '#f1b44c',
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
    background-color: #f5f6f8;
    color: #74788d;
    font-size: 16px;
    text-rendering: optimizeLegibility;
  }

  /* Hide scrollbar */
  ::-webkit-scrollbar{
    width: 0px;
    height:0px;
    background: transparent;
  }

  /*------------------------------------------*/
  /*------------ Reused Styles ---------------*/
  /*------------------------------------------*/

  h1,h2,h3,h4,h5{
    // font-family: 'Poppins', sans-serif;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  p,a,button{
    font-family: 'IBM Plex Sans', sans-serif;
    font-size:100%;
  }

  input,select{
    padding: 10px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #000;
  }
  select{padding:0 !important}
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none !important;
  }

  ::-webkit-input-placeholder { /* Edge */
  color: '#74788d;
  font-size:110%;
  font-family: 'IBM Plex Sans', sans-serif;
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: '#74788d;
    font-size:110%;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  ::placeholder {
    color: #74788d;
    font-size:110%;
   font-family: 'IBM Plex Sans', sans-serif;
  }
  /*------------Icons ---------------*/

  .icons{
    font-size:100%
    color:#000;
  }

  /*------------ Buttons ---------------*/

  button{
    padding:5px;
    outline: none;
    cursor:pointer;
    padding:5px 10px;
    transition: all ease 0.2s;
    font-size:90% !important;
  }

  /*-- Primary Button --*/

  .button-primary{
    background-color:${PRIMARY_PURPLE};
    color:#fff;
    border: 1px solid ${PRIMARY_PURPLE};
    
  }
  .button-primary:hover{
    color:${PRIMARY_PURPLE};
    background-color:${FADED_PURPLE};
    border: 1px solid ${FADED_PURPLE};
  }

  /*-- Secondary Button --*/

  .button-secondary{
    background-color:#fff;
    color:${PRIMARY_PURPLE};
    border: 1px solid ${PRIMARY_PURPLE};
  }
  .button-secondary:hover{
    color:${PRIMARY_PURPLE};
    background-color:${FADED_PURPLE};
    border: 1px solid ${FADED_PURPLE};
  }

  /*-- Danger Button --*/

  .button-danger{
    background-color:${RED};
    color:#fff;
    border: 1px solid ${RED};
  }
  .button-danger:hover{
    color:${RED};
    background-color:${FADED_RED};
    border: 1px solid ${FADED_RED};
  }

  /*-- Danger secondary Button --*/

   .button-danger-secondary{
    background-color:#fff;
    color:${RED};
    border: 1px solid ${RED};
  }
  .button-danger-secondary:hover{
    color:${RED};
    background-color:${FADED_RED};
    border: 1px solid ${FADED_RED};
  }

  /*-- Disabled Button --*/
  button:disabled,
  button[disabled]{
    background-color:${SECONDARY_DARK} !important;
    color:#fff !important;
    border: 1px solid ${SECONDARY_DARK} !important;
    cursor: no-drop !important;
    
  }

  /*------------ Cards ---------------*/

  .cards{
    padding:10px;
    border-radius: 4px;
    background-color:#fff;
    box-shadow: 0 2px 4px rgba(15,34,58,.12);
  }

  .mainHeader{
    position:absolute;
    top:0;
    right:0;
    width:85vw;
  }

  /*------------ Navigation (side) ---------------*/

  .navIcons{
    font-size: '115%',
    margin-right: '10px',
    color: '#9398a4',
    transition: all 0.2s ease;
  }

  .navigationText{
    font-family: 'IBM Plex Sans', sans-serif;
    color:#9398a4;
  }
  
  .navLinks{
    padding:5px;
    padding-left:20px;
    cursor:pointer;
    transition: all 0.2s ease;
  }

  .navLinks:hover{
    background-color:#f3f8fb;
  }
  .navLinks:hover .navigationText
  {
    color:${PRIMARY_PURPLE};
  }

  .activeNavLink{
    background-color:#f3f8fb;
  }

  .activeNavLink .navigationText,
  .activeNavLink .md{
    color:${PRIMARY_PURPLE};
  }

  /*------------ Login page background ---------------*/
  #login_background{
    background-image:url(${LoginBackdrop});
    background-position:center;
    background-size:cover;
    height:100vh;
  }

  /*------------ dashboard main header ---------------*/

  .pageHeaders{
    font-size:150%;
    font-weight:500;
    letter-spacing: 1px;
  }
  
  .blackFont{
    color:${PRIMARY_DARK} !important;
  }

  /*------------ Popup Alert ---------------*/
  .alertWrapper{
    position:absolute;
    top:20px;
    right:20px;
    align-items:center;
    height:80px;
    width:250px;
    padding:15px;
    border-radius:5px;
    opacity:0.8;
    transition:all 0.5s ease;
  }

 .navLinks:hover .md{
    color:${PRIMARY_PURPLE};
  }

`;

export default GlobalStyle;
