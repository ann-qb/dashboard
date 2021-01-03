import styled from 'styled-components'
import Header from '../../../components/Header'

export default function Content(props){
  const ContentContainer = styled.div`
  width:100%;
		margin-left: -10px;
  `;
  
  const mockUserData ={
    username:'thejuss@qburst.com',
    firstName:'Thejus',
    lastName:'Satheesan'
  }
  return (
		<ContentContainer>
			<Header userData={mockUserData} />
		</ContentContainer>
	);
}