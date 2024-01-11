import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%; // 100% da largura do container
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap; // quebra a linha quando não cabe mais na tela desktop (responsividade)
`
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none; // remove a borda do input quando clicado
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
  }

  color: ${(props) => props.theme['gray-100']};
`

// aí importo o BaseInput e estilizo ele de forma diferenciada em cada componente-filho
export const TaskInput = styled(BaseInput)`
  flex: 1; //configura para elemento ocupar todo o espaço disponível, podendo crescer, reduzir conforme o necessário (container = width 100%)

  &::-webkit-calendar-picker-indicator {
    display: none !important; // remove o ícone de setinha do input que tem lista de opções
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
