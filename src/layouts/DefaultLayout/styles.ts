/* pelo que vi é preciso importar styled apenas nos arquivos .css de configuração de formatação
 * sempre os arquivos de estilização são .ts
 */

// essa parte é tipo o design global do meu container, blocão do centro

import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background-color: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
