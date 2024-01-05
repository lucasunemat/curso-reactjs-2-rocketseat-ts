import { HeaderContainer } from './styles'
import logoIgnite from '../../assets/logo-ignite.svg'
// importando ícones ( são importados como componentes ) do phosphor-react para nosso header
import { Timer, Scroll } from 'phosphor-react'
// NavLink é tipo um a (ancora), mas ele aponta para uma rota que você configurou path lá no Router.tsx
import { NavLink } from 'react-router-dom'

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
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
