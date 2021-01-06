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

const UserCardHeadWrapper = styled.div`
	display: flex;
	width: 100%;
	margin: 8px 0;
	padding: 0 10px;
	// background-color: #fff;
`;

const UserCardHeaders = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const HeaderTab = styled.div`
	width:25%;
`

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
			<p className="pageHeaders blackFont">Users</p>
			<ShowIfAuth role="ADMIN">
				<AddButton className="button-primary">+ Add Users</AddButton>
			</ShowIfAuth>

			<UserCardHeadWrapper>
				<UserCardHeaders>
					<HeaderTab>
						<p className="blackFont">Name</p>
					</HeaderTab>
					<HeaderTab>
						<p className="blackFont">Email</p>
					</HeaderTab>
					<HeaderTab>
						<p className="blackFont">Status</p>
					</HeaderTab>
				</UserCardHeaders>

				<ShowIfAuth role="ADMIN">
					<p className="blackFont">Actions</p>
				</ShowIfAuth>
			</UserCardHeadWrapper>

			{createCards()}
		</PageContainer>
	);
}
