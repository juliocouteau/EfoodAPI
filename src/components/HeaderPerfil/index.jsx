
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const HeaderBar = styled.header`
  background-color: #FFEBD9;
  padding: 40px 0;
  
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 900;
    font-size: 18px;
  }

  a, span {
    color: #E66767;
    text-decoration: none;
  }

  /* Estilo para mostrar que o texto é clicável */
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`


export const HeaderPerfil = ({ itensNoCarrinho, openCart }) => (
  <HeaderBar>
    <div className="container">
      <Link to="/">Restaurantes</Link>
      <img src={logo} alt="efood" width="125px" />
      
      
      <span onClick={openCart}>
        {itensNoCarrinho} produto(s) no carrinho
      </span>
    </div>
  </HeaderBar>
)