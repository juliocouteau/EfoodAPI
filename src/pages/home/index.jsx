import { useEffect, useState } from 'react' // Importamos os hooks para AJAX
import styled from 'styled-components'
import { HeaderHome } from '../../components/HeaderHome'
import { RestauranteCard } from '../../components/restauranteCard'

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; // Duas colunas
  column-gap: 80px;
  row-gap: 48px;
  margin-top: 80px;
  margin-bottom: 120px;
`

export const Home = () => {
  // 1. Criamos um estado para guardar os restaurantes que virão da API
  const [restaurantes, setRestaurantes] = useState([])

  // 2. useEffect para disparar a busca assim que a página carregar
  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
      .catch((err) => console.error("Erro ao carregar restaurantes:", err))
  }, [])

  return (
    <>
      <HeaderHome />
      <div className="container">
        <ListContainer>
          {/* 3. Mapeamos o array que veio da API */}
          {restaurantes.map((restaurante) => {
            // A API retorna 'tipo' e 'destacado'. 
            // Vamos montar o array de tags que o seu componente RestauranteCard espera:
            const tags = []
            if (restaurante.destacado) {
              tags.push('Destaque da semana')
            }
            tags.push(restaurante.tipo)

            return (
              <RestauranteCard 
                key={restaurante.id}
                id={restaurante.id} // Importante passar o ID para o link da página de perfil
                nome={restaurante.titulo} // API usa 'titulo'
                nota={restaurante.avaliacao} // API usa 'avaliacao'
                descricao={restaurante.descricao}
                imagem={restaurante.capa} // API usa 'capa'
                tags={tags} // Passamos o array de tags que montamos acima
              />
            )
          })}
        </ListContainer>
      </div>
    </>
  )
}