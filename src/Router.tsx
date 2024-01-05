import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { History } from './pages/History.tsx'
import { DefaultLayout } from './layouts/DefaultLayout/index.tsx'

/**
 * Router tem os seguintes parâmetros:
 * Routes: é o componente que vai conter todas as rotas da aplicação
 * Route: é o componente que vai conter cada rota da aplicação
 * path: é o caminho da rota, o que o usuário precisa digitar na barra de endereço
 * element: é o componente que vai ser renderizado quando o usuário acessar a rota
 */

/**
 * Preciso criar um route que vai envolver os dois outros routes
 * Esse Route envolvedor é o que vai carregar o layout padrão da aplicação
 * Colocamos path =  "/" porque queremos aplicar esse layout para TODAS as nossas telas
 * Veja: HOME e HISTORY tem layouts que estão DE ACORDO com o DefaultLayout
 * Para ter uma pagina diferente, crie um Route com layout AdminLayout por exemplo, coloque um path para ele (ex: /admin)
 * depois, insira os Routes que vão carregar cada página. Ex: <Route path="/products" element={<Products/>}/>
 * Para você conseguir acessar a página products como admin, precisa de usar /admin/products,, no caso.
 */

/**
 * Fluxo de informação: DefaultLayout => Router usa para definir como exibir => Pages
 */

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
