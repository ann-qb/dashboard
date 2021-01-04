import styled from 'styled-components';
import UserCard from './UserCard';

export default function UserPage(props) {
	const PageContainer = styled.div`
		margin-left: 10px;
		padding: 15px;
	`;
	const AddButton = styled.button`
		margin: 15px 0;
	`;
	const createCards = () => {
		return (
			<>
				<UserCard role="ADMIN" />
				<UserCard role="user" />
			</>
		);
	};

	return (
		<PageContainer>
			<p className="pageHeaders">Users</p>
			<AddButton className="button-primary">+ Add Users</AddButton>
			{createCards()}
		</PageContainer>
	);
}
