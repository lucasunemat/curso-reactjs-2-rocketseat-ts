// import styled, { css } from 'styled-components'

/* tipo criado para evitar repetição de código */
// export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'sucesss'

/* interface com propriedades que o meu componente estilizado irá receber e precisa entender para se comunicar com o Button.tsx */
// interface ButtonContainerProps {
//  variant?: ButtonVariant
// existe a propriedade theme aqui tambem
// }

// const buttonVariants = {
//  primary: 'purple',
//  secondary: 'orange',
//  danger: 'red',
//  sucesss: 'green',
// }

/*
 * Abaixo temos componente estilizado
 * Ele é tipo uma função exportável que usa o styled (recurso do styled components) a partir de um componente html nativo (button)
 * para criar um novo componente estilizado
 * O tipo fica entre as <> (com as propriedades que ele precisa entender)
 * As formatações ficam entre as `` (crase)
 */
// export const ButtonContainer = styled.button<ButtonContainerProps>`
//  width: 100px;
//  height: 40px;

/* Dentro das props do meu ButtonContainer, além de variant o styles dá o theme, atributo do tema que posso acessar o thema atual do ThemeProvider e escolher os temas */
//  background-color: ${(props) => props.theme['green-500']};

/* definindo a cor do botao */
//  color: ${(props) => props.theme.white};

/* outras configurações css */
//  border-radius: 4px;
//  border: 0;
//  margin: 8px;

/* usamos o valor passado (variant) pelo Button.tsx para iterar e achar a cor certa no objeto buttonVariants */
/*
    ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant || 'primary']};
    `
  }}
    */
// `
