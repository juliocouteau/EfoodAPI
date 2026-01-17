import styled from 'styled-components'
import { useDispatch } from 'react-redux' 
import { add, open } from '../../store/reducers/cart' 

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const ModalContent = styled.div`
  background-color: #E66767;
  padding: 32px;
  max-width: 1024px;
  width: 90%;
  position: relative;
  display: flex;
  color: #FFF;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-height: 90vh;
    overflow-y: auto;
    padding: 48px 24px 24px;
  }

  img.foto-prato {
    width: 280px;
    height: 280px;
    object-fit: cover;
    display: block;

    @media (max-width: 768px) {
      width: 100%;
      height: 200px;
    }
  }
`

const BotaoFechar = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  font-size: 32px;
  color: #fff;
  line-height: 1;
  padding: 8px;
  
  &:hover {
    opacity: 0.7;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 { 
    font-size: 18px; 
    font-weight: 900;
    margin-bottom: 16px; 
  }
  
  p { 
    font-size: 14px; 
    line-height: 22px; 
    margin-bottom: 16px; 
  }
  
  span { 
    font-size: 14px; 
    margin-bottom: 24px; 
  }
`

const BotaoAdicionar = styled.button`
  background-color: #FFEBD9;
  color: #E66767;
  border: none;
  padding: 4px 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fff;
  }
`

const formatarPreco = (preco) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

export const Modal = ({ aberto, fecharModal, prato }) => {
  const dispatch = useDispatch() // Inicializamos o disparador de ações

  // Se o modal não estiver aberto ou o prato não existir, não renderiza nada
  if (!aberto || !prato) return null;

  // Função que lida com o clique de adicionar ao carrinho
  const handleAddToCart = () => {
    dispatch(add(prato)) // Envia o prato para o Redux
    dispatch(open())     // Abre a barra lateral do carrinho
    fecharModal()        // Fecha a modal de detalhes
  }

  return (
    <ModalOverlay onClick={fecharModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <BotaoFechar onClick={fecharModal}>&times;</BotaoFechar>
        
        <img className="foto-prato" src={prato.foto} alt={prato.nome} />
        
        <InfoContainer>
          <h3>{prato.nome}</h3>
          <p>{prato.descricao}</p>
          <span>Serve: {prato.porcao}</span>
          
          {/* Agora o botão chama a nossa nova função handleAddToCart */}
          <BotaoAdicionar onClick={handleAddToCart}>
            Adicionar ao carrinho - {formatarPreco(prato.preco)}
          </BotaoAdicionar>
        </InfoContainer>
      </ModalContent>
    </ModalOverlay>
  )
}