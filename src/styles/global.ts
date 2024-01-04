import { createGlobalStyle } from 'styled-components'

/* Diferente do componente button que precisa do button.styles.ts para vomitar um componente estilizado
 * O global.ts já pode vomitar um componente estilizado aqui sem precisar invocar um componente estilizado
   em outro arquivo usando o nome do componente como tag
*/
export const GlobalStyle = createGlobalStyle`
    //aqui dentro todo o estilo css global que quero para minha aplicação
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) =>
          props.theme['green-500']}; /* 0 no eixo X, 0 no eixo Y, 0 de blur */
    }

    body {
        background: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
    }

    body, input, textarea, button {
       /* index com as fontes => chama o main.jsx => chama o App.jsx que tem essa GlobalStyle com essas estilizações */
        font-family: 'Roboto', sans-serif; 
        font-weight: 400;
        font-size: 1rem;
    }
`
