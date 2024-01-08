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

const STATUS_COLORS = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const // as const serve para mostrar que o objeto só pode receber os valor 'green-500', 'yellow-500' e 'red-500', e não uma string qualquer

// parametrizando cor do status
interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
  // essa interface serve para travar os valores possíveis de serem recebidos
  // ela indica que os unicos valores possíveis de receber são as chaves do objeto STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  //fazer uma bolinha para indicar o status
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    //Lê o que recebeu de status color, joga no objeto STATUS_COLORS e pega o valor correspondente (valor = descrito pela string, green-500, yellow-500 ou red-500)
  }
`
