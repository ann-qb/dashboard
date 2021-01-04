import styled from 'styled-components';
import UserCard from './UserCard';
import ShowIfAuth from '../../../components/ShowIfAuth';

/**---------------- Styles ------------------*/
const PageContainer = styled.div`
	padding: 15px;
`;
const AddButton = styled.button`
	margin: 15px 0;
`;

export default function UserPage(props) {
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
			<ShowIfAuth role="ADMIN">
				<AddButton className="button-primary">+ Add Users</AddButton>
			</ShowIfAuth>

			{createCards()}
		</PageContainer>
	);
}
