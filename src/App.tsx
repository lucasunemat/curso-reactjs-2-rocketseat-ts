import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

/**
 * Aqui você coloca o ThemeProvider como tag e usa theme como
 * parametro para passar o defaultTheme que você criou como
 * constante exportável em default.ts;
 * Nova aula:
 * GlobalStyle importa os estilos globais que você configurou no arquivo global.ts
 */

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary"/>
      <Button variant="sucesss" />
      <Button variant="danger" />

      <GlobalStyle /> 
    </ThemeProvider>
  )
}

