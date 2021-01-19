import styled from 'styled-components'

const DATA = [
  {name:"Shirts",id:1},
  {name:"Pants",id:2},
  {name:"Ladies",id:3},
  {name:"Kids",id:4}
]

const DropDownWrapper = styled.div`
  z-index:999999;
  position:absolute;
  top:100%;
  display:flex;
  Justify-content:space-around;
  width:50%;
  height:fit-content;
  padding:15px;
  margin:0 auto;
`
const SubCategoryLink = styled.p`
  color:#000;
  cursor:pointer;
`

export default function SubCategoryDropdown(props){
  return <DropDownWrapper className="cards">
    {DATA.map(data => <SubCategoryLink key={data.id}>{data.name}</SubCategoryLink>)}
  </DropDownWrapper>;
}