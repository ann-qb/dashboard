import styled from 'styled-components';

/**
 * USAGE
 * -----------------
 * import the component: [import AlertPopup from '.__path__/components/Popups/AlertPopups';]
 * Pass message to be displayed as 'message.
 * Pass type of alert prop as 'alertType'
 * 
 * create a state variable and pass its value as 'display' props to show or hide the alert.
 * 
 * In order to close the alert after 3 sec, copy and paste this function in the component where the AlertPopup is called:
 * if(alertDisplay){
		setTimeout(() => {
			setAlertDisplay(false)
		}, 3000);
	}
	[Replace 'setAlertDisplay' to your setState function and 'alertDisplay' to your state variable]
 */

export default function AlertPopup(props) {
	let backgroundColor, borderColor;

	// Setup background color based on type of alert
	if (props.alertType === 'success') {
		backgroundColor = '#34c38f';
		borderColor = '#34c38f';
	} else if (props.alertType === 'error') {
		backgroundColor = '#f46a6a';
		borderColor = '#f46a6a';
	} else if (props.alertType === 'warning') {
		backgroundColor = '#f1b44c';
		borderColor = '#f1b44c';
	} else {
		backgroundColor = '#343a40';
		borderColor = '#343a40';
	}

	// Set icon based on type of alert
	const generateIcon = (typeOfAlert) => {
		if (typeOfAlert === 'success') {
			return <ion-icon style={iconStyle} name="checkmark-done-outline"></ion-icon>;
		} else if (typeOfAlert === 'error') {
			return <ion-icon style={iconStyle} name="alert-outline"></ion-icon>;
		} else if (typeOfAlert === 'warning') {
			return <ion-icon style={iconStyle} name="alert-circle-outline"></ion-icon>;
		} else {
			return <ion-icon style={iconStyle} name="bug-outline"></ion-icon>;
		}
	};

	// Set type of display based on props
	let display = 'none';
	props.display ? (display = 'flex') : (display = 'none');

	const AlertWrapper = styled.div`
		display: ${display};
		background-color: ${backgroundColor};
		border: 1px solid ${borderColor};
		z-index:9999999999;
	`;

	const AlertTextBox = styled.div`
		width: 100%;
		height: fit-content;
		padding: 5px;
	`;

	const AlertText = styled.p`
		color: #fff;
		font-size: 90%;
	`;

	const iconStyle = {
		color: '#fff',
		fontSize: '200%',
		marginRight: '5px',
	};

	return (
		<AlertWrapper className="alertWrapper">
			{generateIcon(props.alertType)}
			<AlertTextBox>
				<AlertText>{props.message}</AlertText>
			</AlertTextBox>
		</AlertWrapper>
	);
}
