import { HeaderContainer } from './styles'

// eu estou configurando o Header, que é parte do layout padrão DefaultLayout (que também tem sua estilização própria)
/**
 * Talvez você se pergunte como que aparece as coisas no outlet do layout padrão.
 * Lá aparece tudo que foi configurado para aparecer no Router.tsx
 * Ou seja, o layout padrão organiza:
 * Header em cima
 * Outlet em baixo
 * Outlet -> busca tudo que foi configurado no Router.tsx para aparecer na tela de acordo com o que o usuário digita no navegador
 */

export function Header() {
  return (
    <HeaderContainer>
      <span>logo</span>
      <nav>
        <a href="">timer</a>
        <a href="">history</a>
      </nav>
    </HeaderContainer>
  )
}
