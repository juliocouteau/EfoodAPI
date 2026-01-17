import styled from 'styled-components'

const Card = styled.div`
  background-color: #E66767;
  padding: 8px;
  color: #FFEBD9;
  display: flex;
  flex-direction: column;
  height: 100%; // Garante que todos os cards tenham a mesma altura no grid

  img {
    width: 100%;
    height: 167px;
    object-fit: cover;
    display: block;
    margin-bottom: 8px;
  }

  h3 {
    font-weight: 900;
    font-size: 16px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 8px;
    flex-grow: 1; // Faz o texto ocupar o espaço restante, empurrando o botão para o fim
  }
`

const BotaoAdicionar = styled.button`
  background-color: #FFEBD9;
  color: #E66767;
  border: none;
  padding: 4px 0;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

export const ProdutoCard = ({ nome, descricao, imagem }) => {
  // Função para limitar o texto da descrição no card
  const getDescricao = (texto) => {
    if (texto.length > 135) {
      return texto.slice(0, 132) + '...'
    }
    return texto
  }

  return (
    <Card>
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p title={descricao}>
        {getDescricao(descricao)}
      </p>
      {/* 
          Dica: Como o clique para abrir a modal está no elemento pai (lá no Perfil),
          este botão serve mais como um indicativo visual no card.
      */}
      <BotaoAdicionar>Mais detalhes</BotaoAdicionar>
    </Card>
  )
}