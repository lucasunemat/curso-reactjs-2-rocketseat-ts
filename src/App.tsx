import { ThemeProvider } from 'styled-components' // para habilitar uso de temas precisa do ThemeProvider
import { defaultTheme } from './styles/themes/default' // aqui estou só importando o tema default
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CyclesContext'
// import { Home } from './home'

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

/**
 * Aparentemente o Router usa o layout padrão para renderizar as páginas
 */

export function App() {
  return (
    // invocação do home-teste que usei para documentar explicação de context API<Home />
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter basename="/igniteTimerLucasNBat">
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}

/**
 *         <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleID,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
 */
