/* arquivos .d.ts servem para DEFINIÇÃO de tipos do typescript */

import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// guardando o tipo do meu tema ( com todas as suas constantes e valores possíveis lá dentro ) dentro de uma variável
type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  // sobrescrevendo o tipo DefaultTheme do styled-components
  // com os valores do meu tema (os quais estão no ThemeType)
  export interface DefaultTheme extends ThemeType {}
}
