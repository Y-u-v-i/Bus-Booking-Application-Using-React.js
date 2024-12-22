import styled from 'styled-components'
const HeaderContainer=styled.header`
background: rgb(131,58,180);
background: radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(137,29,253,1) 50%, rgba(252,176,69,1) 100%);
color: white;
font-family:'Franklin Gothic Medium';
text-align:center;
padding:1rem;
`
const HeaderTitle=styled.h1`
font-size:2rem;
margin:0;
`
export default function Header() {
  return (
    <div>
      <HeaderContainer>
        <HeaderTitle>
            Bus Ticket Booking App
        </HeaderTitle>
      </HeaderContainer>
    </div>
  )
}
