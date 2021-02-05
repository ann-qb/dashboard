import styled from 'styled-components';
import Logo from '../../assets/Images/logo_white.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > svg': {
			cursor: 'pointer',
			transition: '0.2s',
			'&:hover': {
				transition: '0.2s',
				color: '#5673e8 !important',
			},
		},
	},
}));

const FooterWrapper = styled.div`
	bottom: 0;
	display: flex;
	// justify-content: space-around;
	align-items: center;
	width: 100%;
	min-height: 200px;
	padding: 35px;
	background-color: #24232a;
`;
const CopyrightWrapper = styled.div`
	width: 33%;
	height: fit-content;
`;
const CopyrightYear = styled.span`
	font-weight: 500;
`;
const LogoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 33%;
`;
const LogoImage = styled.img`
	height: auto;
	width: 30%;
	margin-bottom: 20px;
`;
const IconWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 33%;
`;
const FooterText = styled.p`
	color: #fcfcfc;
`;

export default function StoreFooter(props) {
	const classes = useStyles();
	return (
		<FooterWrapper>
			<CopyrightWrapper>
				<FooterText>
					{' '}
					<CopyrightYear>&#169; 2021</CopyrightYear> Ann&Thejus
				</FooterText>
			</CopyrightWrapper>
			<LogoWrapper>
				<LogoImage src={Logo} alt="Logo" />
				<FooterText>Oddy Corporation pvt. ltd.</FooterText>
			</LogoWrapper>

			<IconWrapper className={classes.root}>
				<FacebookIcon style={{ color: '#fff', marginRight: '20px' }} />
				<LinkedInIcon style={{ color: '#fff', marginRight: '20px' }} />
				<GitHubIcon fontSize="small" style={{ color: '#fff', marginRight: '20px' }} />
			</IconWrapper>
		</FooterWrapper>
	);
}
