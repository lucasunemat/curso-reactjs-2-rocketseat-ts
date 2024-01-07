import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

// div criada para facilitar criar tabela scrollavel no mobile
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto; // scroll quando o conteúdo ultrapassar o tamanho do container
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 680px; //tamanho minimo para gerar scroll em telas menores

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      //arredondando bordas
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']}; //cor de fundo
      border-top: 4px solid ${(props) => props.theme['gray-800']}; //configuração de broda do topo
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%; //fazer o nome da tarefa tomar mais espaço
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
