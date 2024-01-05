import styled from 'styled-components'

// e essa é tipo a estilização do Header, que é um componente

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      //tratando os links como flex para centralizar bem eles na tela (não fica o icone com uma caixa invisivel torta em volta)
      display: flex;
      align-items: center;
      justify-content: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent; //borda que serve para alinhar ao centro novamente depois de adicionar a borda de baixo
      border-bottom: 3px solid transparent; //borda para efeito visual do hover abaixo

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      //classe active o NavLink adiciona automaticamente quando o link está ativo, e podemos estilizar ela aqui
      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
