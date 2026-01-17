import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { close, remove, clear } from '../../store/reducers/cart'

// --- ESTILOS ---
const CartContainer = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex; justify-content: flex-end;
  z-index: 200;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
`
const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`
const Sidebar = styled.aside`
  background-color: #E66767;
  z-index: 1;
  padding: 32px 8px;
  max-width: 360px;
  width: 100%;
  display: flex; flex-direction: column;
  color: #FFEBD9;
  overflow-y: auto;

  h2 { font-size: 16px; font-weight: 700; margin-bottom: 16px; }
  p { font-size: 14px; line-height: 22px; margin-bottom: 16px; }
`
const CartItem = styled.div`
  background-color: #FFEBD9;
  display: flex; padding: 8px;
  position: relative; margin-bottom: 16px;
  color: #E66767;
  img { height: 80px; width: 80px; object-fit: cover; margin-right: 8px; }
  div {
    h3 { font-size: 18px; font-weight: 900; margin-bottom: 8px; }
    span { font-size: 14px; }
  }
`
const TrashButton = styled.button`
  background: transparent; border: none;
  position: absolute; bottom: 8px; right: 8px; cursor: pointer;
  svg { fill: #E66767; width: 16px; height: 16px; }
`
const FormContainer = styled.div`
  display: flex; flex-direction: column;
  gap: 8px;
  label { font-size: 14px; font-weight: 700; margin-bottom: 8px; margin-top: 8px; }
  input { 
    background-color: #FFEBD9; border: 1px solid #FFEBD9; 
    padding: 8px; width: 100%; color: #4B4B4B; font-weight: 700;
  }
`
const Row = styled.div`
  display: flex; gap: 34px;
  div { flex: 1; }
`
const Button = styled.button`
  background-color: #FFEBD9;
  color: #E66767;
  border: none; padding: 8px;
  font-weight: 700; cursor: pointer;
  width: 100%; margin-top: 24px;
  &:hover { background-color: #fff; }
`


export const Cart = () => {
  const [step, setStep] = useState('cart') 
  const dispatch = useDispatch()
  const { isOpen, items } = useSelector((state) => state.cart)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  const getTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.preco, 0)
  }

  // Função para fechar e resetar o carrinho
  const handleClose = () => {
    setStep('cart')
    dispatch(close())
  }

  
  const handleFinish = () => {
    dispatch(clear())
    setStep('cart')
    dispatch(close())
  }

  if (!isOpen) return null

  return (
    <CartContainer isOpen={isOpen}>
      <Overlay onClick={handleClose} />
      <Sidebar>
        
        
        {step === 'cart' && (
          <>
            <h2>Pedido</h2>
            {items.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                <ul>
                  {items.map((item) => (
                    <CartItem key={item.id}>
                      <img src={item.foto} alt={item.nome} />
                      <div>
                        <h3>{item.nome}</h3>
                        <span>{formatPrice(item.preco)}</span>
                      </div>
                      <TrashButton onClick={() => dispatch(remove(item.id))}>
                        <svg viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                      </TrashButton>
                    </CartItem>
                  ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                  <strong>Valor total</strong>
                  <strong>{formatPrice(getTotalPrice())}</strong>
                </div>
                <Button onClick={() => setStep('delivery')}>Continuar com a entrega</Button>
              </>
            )}
          </>
        )}

       
        {step === 'delivery' && (
          <FormContainer>
            <h2>Entrega</h2>
            <label>Quem irá receber</label><input type="text" />
            <label>Endereço</label><input type="text" />
            <label>Cidade</label><input type="text" />
            <Row>
              <div><label>CEP</label><input type="text" /></div>
              <div><label>Número</label><input type="text" /></div>
            </Row>
            <label>Complemento (opcional)</label><input type="text" />
            <Button onClick={() => setStep('payment')}>Continuar com o pagamento</Button>
            <Button onClick={() => setStep('cart')}>Voltar para o carrinho</Button>
          </FormContainer>
        )}

        
        {step === 'payment' && (
          <FormContainer>
            <h2>Pagamento - Valor a pagar {formatPrice(getTotalPrice())}</h2>
            <label>Nome no cartão</label><input type="text" />
            <Row>
              <div style={{flex: 1.5}}><label>Número do cartão</label><input type="text" /></div>
              <div><label>CVV</label><input type="text" /></div>
            </Row>
            <Row>
              <div><label>Mês de vencimento</label><input type="text" /></div>
              <div><label>Ano de vencimento</label><input type="text" /></div>
            </Row>
            <Button onClick={() => setStep('success')}>Finalizar pagamento</Button>
            <Button onClick={() => setStep('delivery')}>Voltar para a edição do endereço</Button>
          </FormContainer>
        )}

        
        {step === 'success' && (
          <>
            <h2>Pedido realizado - #12345</h2>
            <p>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</p>
            <p>Esperamos que desfrute de uma deliciosa experiência gastronômica. Bom apetite!</p>
            <Button onClick={handleFinish}>Concluir</Button>
          </>
        )}

      </Sidebar>
    </CartContainer>
  )
}