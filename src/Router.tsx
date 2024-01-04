import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { History } from './pages/History.tsx'

/**
 * Router tem os seguintes parâmetros:
 * Routes: é o componente que vai conter todas as rotas da aplicação
 * Route: é o componente que vai conter cada rota da aplicação
 * path: é o caminho da rota, o que o usuário precisa digitar na barra de endereço
 * element: é o componente que vai ser renderizado quando o usuário acessar a rota
 */

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
