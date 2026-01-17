import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // Importante para pegar o ID da URL
import styled from 'styled-components'

import { HeaderPerfil } from '../../components/HeaderPerfil'
import { Banner } from '../../components/Banner'
import { ProdutoCard } from '../../components/ProdutoCard'
import { Modal } from '../../components/Modal'
import { Cart } from '../../components/Cart'

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 32px;
  row-gap: 32px;
  margin-top: 56px;
  margin-bottom: 120px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Perfil = () => {
  const { id } = useParams() // Pega o ID que vem da rota
  const [restaurante, setRestaurante] = useState(null)
  const [modalAberta, setModalAberta] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [itensNoCarrinho, setItensNoCarrinho] = useState([])

  // Buscar os dados do restaurante específico na API
  useEffect(() => {
    fetch(`https://api-ebac.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurante(data))
      .catch((err) => console.error("Erro ao buscar restaurante:", err))
  }, [id])

  // Funções da Modal
  const handleOpenModal = (produto) => {
    setProdutoSelecionado(produto)
    setModalAberta(true)
  }
  
  const handleCloseModal = () => {
    setModalAberta(false)
    setProdutoSelecionado(null)
  }

  // Funções do Carrinho
  const handleOpenCart = () => setCarrinhoAberto(true)
  const handleCloseCart = () => setCarrinhoAberto(false)

  const handleAddToCart = () => {
    if (produtoSelecionado) {
      setItensNoCarrinho([...itensNoCarrinho, produtoSelecionado])
      setModalAberta(false)
      setCarrinhoAberto(true)
    }
  }

  const handleRemoveItem = (indexToRemove) => {
    setItensNoCarrinho(itensNoCarrinho.filter((_, index) => index !== indexToRemove))
  }

  const handleClearCart = () => {
    setItensNoCarrinho([])
  }

  // Enquanto a API não responde, exibe um carregando
  if (!restaurante) {
    return <div className="container"><h3>Carregando...</h3></div>
  }

  return (
    <>
      <HeaderPerfil 
        itensNoCarrinho={itensNoCarrinho.length} 
        openCart={handleOpenCart} 
      />
      
      {/* Passamos os dados do restaurante para o Banner */}
      <Banner 
        imagem={restaurante.capa} 
        tipo={restaurante.tipo} 
        nome={restaurante.titulo} 
      />
      
      <div className="container">
        <ListContainer>
          {/* Mapeamos o cardápio real que vem da API */}
          {restaurante.cardapio.map((produto) => (
            <div key={produto.id} onClick={() => handleOpenModal(produto)} style={{ cursor: 'pointer' }}>
              <ProdutoCard 
                nome={produto.nome} 
                descricao={produto.descricao} 
                imagem={produto.foto} 
              />
            </div>
          ))}
        </ListContainer>
      </div>

      {/* Modal agora recebe o produto que foi clicado dinamicamente */}
      <Modal 
        aberto={modalAberta} 
        fecharModal={handleCloseModal} 
        adicionarAoCarrinho={handleAddToCart}
        prato={produtoSelecionado} // Passamos o produto selecionado
      />

      <Cart 
        isOpen={carrinhoAberto} 
        closeCart={handleCloseCart}
        items={itensNoCarrinho}
        removeItem={handleRemoveItem}
        clearCart={handleClearCart}
      />
    </>
  )
}