import styled from 'styled-components'
import bannerImg from '../../assets/download.png'

const ImagemBanner = styled.div`
  width: 100%;
  height: 280px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  
  /* Mantemos o fundo escuro (overlay) para o texto branco não sumir */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .container {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 32px 0;
    color: #FFF;
  }
`

const Categoria = styled.h3`
  font-weight: 100;
  font-size: 32px;
  text-transform: capitalize;
`

const Titulo = styled.h2`
  font-weight: 900;
  font-size: 32px;
`

export const Banner = () => (
  <ImagemBanner style={{ backgroundImage: `url(${bannerImg})` }}>
    <div className="container">
      <Categoria>Italiana</Categoria>
      <Titulo>La Dolce Vita Trattoria</Titulo>
    </div>
  </ImagemBanner>
)