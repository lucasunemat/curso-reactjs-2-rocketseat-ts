import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defaultTheme } from "./styles/themes/default";

/**
 * Aqui você coloca o ThemeProvider como tag e usa theme como
 * parametro para passar o defaultTheme que você criou como
 * constante exportável em default.ts 
 */

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary"/>
      <Button variant="sucesss" />
      <Button variant="danger" />
    </ThemeProvider>
  )
}

