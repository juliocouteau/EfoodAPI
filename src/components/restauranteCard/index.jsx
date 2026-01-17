import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Card = styled.div`
  background-color: #FFF;
  border: 1px solid #E66767;
  position: relative;
  color: #E66767;
  display: flex;
  flex-direction: column;
  height: 100%; // Garante que todos os cards tenham a mesma altura
`

const ImagemContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 217px;
    object-fit: cover;
    display: block;
  }
`

const TagContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

const Tag = styled.div`
  background-color: #E66767;
  color: #FFEBD9;
  padding: 6px 4px;
  font-size: 12px;
  font-weight: bold;
`

const Info = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; // Faz o container de info ocupar o espaço restante
`

const TituloNota = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    font-size: 18px;
    font-weight: bold;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    
    svg {
      width: 21px;
      height: 21px;
      fill: #FFB930;
    }
  }
`

const Descricao = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  flex-grow: 1; // Empurra o botão "Saiba mais" para o fundo do card
`

const Botao = styled(Link)`
  background-color: #E66767;
  color: #FFEBD9;
  padding: 4px 6px;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  text-decoration: none; // Remove o sublinhado padrão do Link
  align-self: flex-start; // Mantém o botão alinhado à esquerda
  
  &:hover {
    opacity: 0.8;
  }
`

// Adicionamos o 'id' nas propriedades recebidas
export const RestauranteCard = ({ id, nome, nota, descricao, imagem, tags }) => {
  
  // Opcional: Limitar a descrição na Home para manter o layout alinhado
  const getDescricaoCurta = (texto) => {
    if (texto.length > 250) {
      return texto.slice(0, 247) + '...'
    }
    return texto
  }

  return (
    <Card>
      <ImagemContainer>
        <img src={imagem} alt={nome} />
        <TagContainer>
          {/* Verifica se existem tags antes de fazer o map */}
          {tags && tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagContainer>
      </ImagemContainer>
      <Info>
        <TituloNota>
          <h3>{nome}</h3>
          <span>
            {nota} 
            <svg viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </span>
        </TituloNota>
        <Descricao>{getDescricaoCurta(descricao)}</Descricao>
        
        {/* Agora o link aponta para o ID real do restaurante */}
        <Botao to={`/perfil/${id}`}>Saiba mais</Botao>
      </Info>
    </Card>
  )
}