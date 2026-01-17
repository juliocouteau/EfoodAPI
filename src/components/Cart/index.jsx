import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { close, remove, clear } from '../../store/reducers/cart'

const CartContainer = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  display: flex; justify-content: flex-end; z-index: 200;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
`
const Overlay = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`
const Sidebar = styled.aside`
  background-color: #E66767; z-index: 1; padding: 32px 8px;
  max-width: 360px; width: 100%; display: flex; flex-direction: column;
  color: #FFEBD9; overflow-y: auto;
  h2 { font-size: 16px; font-weight: 700; margin-bottom: 16px; }
  p { font-size: 14px; line-height: 22px; margin-bottom: 16px; }
`
const CartItem = styled.div`
  background-color: #FFEBD9; display: flex; padding: 8px;
  position: relative; margin-bottom: 16px; color: #E66767;
  img { height: 80px; width: 80px; object-fit: cover; margin-right: 8px; }
  div { h3 { font-size: 18px; font-weight: 900; margin-bottom: 8px; } }
`
const FormContainer = styled.div`
  display: flex; flex-direction: column; gap: 8px;
  label { font-size: 14px; font-weight: 700; margin-top: 8px; }
  input { 
    background-color: #FFEBD9; border: 1px solid #FFEBD9; 
    padding: 8px; width: 100%; color: #4B4B4B; font-weight: 700;
  }
`
const Row = styled.div` display: flex; gap: 34px; div { flex: 1; } `
const Button = styled.button`
  background-color: #FFEBD9; color: #E66767; border: none; padding: 8px;
  font-weight: 700; cursor: pointer; width: 100%; margin-top: 24px;
  &:hover { background-color: #fff; }
`

export const Cart = () => {
  const dispatch = useDispatch()
  const { isOpen, items } = useSelector((state) => state.cart)
  
  const [step, setStep] = useState('cart')
  const [orderId, setOrderId] = useState('')
  const [isPayloadLoading, setIsPayloadLoading] = useState(false)

  const [formData, setFormData] = useState({
    receiver: '', address: '', city: '', zipCode: '', number: '', complement: '',
    cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: ''
  })

  const formatPrice = (price) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  const total = items.reduce((acc, item) => acc + item.preco, 0)

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  
  const checkDelivery = () => {
    const { receiver, address, city, zipCode, number } = formData
    if (receiver && address && city && zipCode && number) {
      setStep('payment')
    } else {
      alert('Por favor, preencha todos os campos obrigatórios da entrega.')
    }
  }


  const checkPayment = () => {
    const { cardName, cardNumber, cardCode, expiresMonth, expiresYear } = formData
    if (cardName && cardNumber && cardCode && expiresMonth && expiresYear) {
      handleCheckout()
    } else {
      alert('Por favor, preencha todos os campos do cartão de crédito.')
    }
  }

  const handleCheckout = () => {
    setIsPayloadLoading(true)
    const payload = {
      products: items.map(item => ({ id: item.id, price: item.preco })),
      delivery: {
        receiver: formData.receiver,
        address: {
          description: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          number: Number(formData.number),
          complement: formData.complement
        }
      },
      payment: {
        card: {
          name: formData.cardName,
          number: formData.cardNumber,
          code: Number(formData.cardCode),
          expires: {
            month: Number(formData.expiresMonth),
            year: Number(formData.expiresYear)
          }
        }
      }
    }

    fetch('https://api-ebac.vercel.app/api/efood/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      setOrderId(data.orderId)
      setStep('success')
    })
    .catch(() => alert("Erro ao processar pedido"))
    .finally(() => setIsPayloadLoading(false))
  }

  const finishOrder = () => {
    dispatch(clear())
    setStep('cart')
    dispatch(close())
    setFormData({
      receiver: '', address: '', city: '', zipCode: '', number: '', complement: '',
      cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: ''
    })
  }

  if (!isOpen) return null

  return (
    <CartContainer isOpen={isOpen}>
      <Overlay onClick={() => dispatch(close())} />
      <Sidebar>
        
        {step === 'cart' && (
          <>
            <h2>Pedido</h2>
            {items.map((item, index) => (
              <CartItem key={index}>
                <img src={item.foto} alt={item.nome} />
                <div><h3>{item.nome}</h3><span>{formatPrice(item.preco)}</span></div>
                <TrashButton onClick={() => dispatch(remove(item.id))}>
                   <svg viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </TrashButton>
              </CartItem>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '24px'}}>
              <strong>Total</strong><strong>{formatPrice(total)}</strong>
            </div>
            <Button onClick={() => setStep('delivery')}>Continuar com a entrega</Button>
          </>
        )}

        {step === 'delivery' && (
          <FormContainer>
            <h2>Entrega</h2>
            <label>Quem irá receber</label>
            <input type="text" value={formData.receiver} onChange={e => updateField('receiver', e.target.value)} />
            <label>Endereço</label>
            <input type="text" value={formData.address} onChange={e => updateField('address', e.target.value)} />
            <label>Cidade</label>
            <input type="text" value={formData.city} onChange={e => updateField('city', e.target.value)} />
            <Row>
              <div><label>CEP</label><input type="text" value={formData.zipCode} onChange={e => updateField('zipCode', e.target.value)} /></div>
              <div><label>Número</label><input type="text" value={formData.number} onChange={e => updateField('number', e.target.value)} /></div>
            </Row>
            <label>Complemento (opcional)</label>
            <input type="text" value={formData.complement} onChange={e => updateField('complement', e.target.value)} />
            
          
            <Button onClick={checkDelivery}>Continuar com o pagamento</Button>
            <Button onClick={() => setStep('cart')}>Voltar para o carrinho</Button>
          </FormContainer>
        )}

        {step === 'payment' && (
          <FormContainer>
            <h2>Pagamento - Valor a pagar {formatPrice(total)}</h2>
            <label>Nome no cartão</label>
            <input type="text" value={formData.cardName} onChange={e => updateField('cardName', e.target.value)} />
            <Row>
              <div style={{flex: 1.5}}><label>Número do cartão</label>
              <input type="text" value={formData.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} /></div>
              <div><label>CVV</label>
              <input type="text" value={formData.cardCode} onChange={e => updateField('cardCode', e.target.value)} /></div>
            </Row>
            <Row>
              <div><label>Mês de vencimento</label>
              <input type="text" value={formData.expiresMonth} onChange={e => updateField('expiresMonth', e.target.value)} /></div>
              <div><label>Ano de vencimento</label>
              <input type="text" value={formData.expiresYear} onChange={e => updateField('expiresYear', e.target.value)} /></div>
            </Row>
            
         
            <Button disabled={isPayloadLoading} onClick={checkPayment}>
              {isPayloadLoading ? 'Processando...' : 'Finalizar pagamento'}
            </Button>
            <Button onClick={() => setStep('delivery')}>Voltar para a entrega</Button>
          </FormContainer>
        )}

        {step === 'success' && (
          <>
            <h2>Pedido realizado - {orderId}</h2>
            <p>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</p>
            <p>Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras. </p>
            <p>Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo a sua segurança e bem-estar.</p>
            <p>Esperamos que desfrute de uma deliciosa experiência gastronômica. Bom apetite!</p>
            <Button onClick={finishOrder}>Concluir</Button>
          </>
        )}
      </Sidebar>
    </CartContainer>
  )
}


const TrashButton = styled.button`
  background: transparent; border: none; position: absolute;
  bottom: 8px; right: 8px; cursor: pointer;
  svg { fill: #E66767; width: 16px; height: 16px; }
`