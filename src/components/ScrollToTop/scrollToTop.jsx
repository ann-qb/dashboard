import styled from 'styled-components';
import { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	button: {
		zIndex: 9999999,
		position: 'fixed',
		bottom: '2vh',
		backgroundColor: '#5673E8',
		color: '#000',
		'&:hover': {
			transition: '0.2s',
			color: '#000',
			backgroundColor: '#d6dcf9',
		},
		right: '5%',
	},
}));

export default function ScrollToTop(props) {
	const showBelow = 250;
	const classes = useStyles();
	const [show, setShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const handleScroll = () => {
		if (window.pageYOffset > showBelow) {
			if (!show) setShow(true);
		} else {
			if (show) setShow(false);
		}
	};

	const handleClick = () => {
		window['scrollTo']({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			{show ? (
				<IconButton onClick={handleClick} className={classes.button}>
					<ExpandLessIcon />
				</IconButton>
			) : null}
		</>
	);
}
