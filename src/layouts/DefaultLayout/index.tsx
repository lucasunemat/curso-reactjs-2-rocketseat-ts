import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

/**
 * Layout de tela para evitar repetição de renderização de componentes
 * Aqui estou especificando que tem que ter um componente Header nesse layout e
 * que o conteúdo da página vai ser renderizado no Outlet. Outlet serve para isso:
 * renderizar o conteúdo único da página.
 */

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
