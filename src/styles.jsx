import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  z-index: 100;


  @media (min-width: 768px){
    justify-content: space-around;
  }
`

export const LogoImg = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.5s ease;

  &:hover{
  transform:scale(1.02)
  }
`;

export const Button = styled.button`
height:40px;
border-radius:8px;
border-width:0px;
cursor:pointer;
font-size: 16px;
font-weight:600;
outline:none;

&:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    backgroud:pink;
  }


`


export const Main = styled.main`
    display: flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    gap: 10px;
    margin-top:60px;
    padding:6px;
`