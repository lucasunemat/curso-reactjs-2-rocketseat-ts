import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariant
}

/**
 * Abaixo você pode ver que fazemos destructuring da propriedade color,
 * Definimos primary como valor padrão caso não seja passado nada.
 * Depois temos uma configuração de classe que diz:
 * Sempre terá a classe button
 * Seguida de...
 * styles[primary, ou secondary, ou danger, ou sucesss] => isso é para navegar entre as classes do css
 * A depender de qual classe for visada, vai mudar a cor do fundo (porque a classe do module faz isso)
 */

/**
 * Atualização Aula sobre Styled Components:
 * Abaixo você verá retorno de um componente botão previamente estilizado que tem a propriedade variant
 * recebendo um valor padrão de primary para uma propriedade variant (mesmo nome) desse meu componente Button.tsx
 * O componente estilizado também tem uma configuração de tipo nele para que entenda o que é primary, secondary, danger e sucesss
 */

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Click me!</ButtonContainer>
}
