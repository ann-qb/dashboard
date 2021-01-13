import styled from 'styled-components'

export default function StatCards(props){
  let color,bgColor,text
  if (props.type === 'users') {
		color = '#5673E8';
    bgColor = '#d6dcf9';
    text="Users"
	} else if (props.type === 'active_users') {
		color = '#34c38f';
    bgColor = '#ccf0e8';
    text = 'Active';
	} else if (props.type === 'pending_users') {
		color = '#74788d';
    bgColor = '#dcdde2';
    text = 'Pending';
	} else if (props.type === 'inactive_users') {
		color = '#f46a6a';
    bgColor = '#fcdada';
    text = 'Inactive';
  }

  // Styles are dynamic, hence written inside function
  const StatCard = styled.div`
		display: flex;
		align-items: center;
		width: 24%;
		height: fit-content;
		padding: 15px !important;
	`;
	const IconWrapper = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70px;
		height: 70px;
		border: none;
		border-radius: 50%;
		background-color: ${bgColor};
	`;

	const IconStyle = {
		color: color,
		fontSize: '220%',
	};

	const DataWrapper = styled.div`
		padding-left: 15px;
	`;

	const CounterText = styled.p`
		font-size: 230%;
		font-weight: 500;
		color: #000;
	`;
  
  return (
		<StatCard className="cards">
			<IconWrapper>
				<ion-icon style={IconStyle} name="people-outline"></ion-icon>
			</IconWrapper>
			<DataWrapper>
				<CounterText>{props.count}</CounterText>
				<p>{text}</p>
			</DataWrapper>
		</StatCard>
	);
}