import styled from 'styled-components'

import logo from '../../assets/logo.png'
import redesSociais from '../../assets/redes-sociais.png'

const FooterContainer = styled.footer`
  background-color: #FFEBD9;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  width: 100%; /* Adicione isso para garantir que ele ocupe a tela */
`

const Disclaimer = styled.p`
  font-size: 10px;
  text-align: center;
  max-width: 480px;
  line-height: 12px;
  color: #E66767;
  margin-top: 80px;
`

export const Footer = () => {
  return (
    <FooterContainer>
      <img src={logo} alt="efood" width="125px" />
      <img src={redesSociais} alt="Redes Sociais" style={{ marginTop: '32px' }} />
      <Disclaimer>
        A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, 
        qualidade dos produtos é toda do estabelecimento contratado.
      </Disclaimer>
    </FooterContainer>
  )
}