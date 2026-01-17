import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' // Importamos os hooks do Redux
import { open } from '../../store/reducers/cart' // Importamos a ação de abrir o carrinho
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

    /* Ajuste para telas menores */
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  a, span {
    color: #E66767;
    text-decoration: none;
  }

  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

export const HeaderPerfil = () => {
  const dispatch = useDispatch() 
  

  const { items } = useSelector((state) => state.cart)

  return (
    <HeaderBar>
      <div className="container">
        <Link to="/">Restaurantes</Link>
        
        <Link to="/">
          <img src={logo} alt="efood" width="125px" />
        </Link>

        <span onClick={() => dispatch(open())}>
          {items.length} produto(s) no carrinho
        </span>
      </div>
    </HeaderBar>
  )
}