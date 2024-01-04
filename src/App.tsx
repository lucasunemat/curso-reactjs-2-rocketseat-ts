import { ThemeProvider } from 'styled-components' // para habilitar uso de temas precisa do ThemeProvider
import { defaultTheme } from './styles/themes/default' // aqui estou só importando o tema default
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

/**
 * Aqui você coloca o ThemeProvider como tag e usa theme como
 * parametro para passar o defaultTheme que você criou como
 * constante exportável em default.ts;
 * Nova aula:
 * GlobalStyle importa os estilos globais que você configurou no arquivo global.ts
 */

/**
 * Depois que configurar as rotas no Router.tsx você vai invocar o componente aqui
 * BrowserRooter é importante ficar ao redor das rotas para que os compoenentes sejam renderizados sem erros no navegador
 */

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
