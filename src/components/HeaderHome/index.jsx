import styled from 'styled-components'
import logo from '../../assets/logo.png' // Lembre-se que o seu é .png

const HeaderBar = styled.header`
  background-color: #FFEBD9;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h2 {
    margin-top: 140px;
    font-weight: 900;
    font-size: 36px;
    text-align: center;
    max-width: 540px;
    color: #E66767;
  }
`

export const HeaderHome = () => (
  <HeaderBar>
    <img src={logo} alt="efood" width="125px" />
    <h2>Viva experiências gastronômicas no conforto da sua casa</h2>
  </HeaderBar>
)