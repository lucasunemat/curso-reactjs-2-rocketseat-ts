// isso era apenas uma explicação sobre contextos. Vou comentar tudo e deixar para consulta futura

/*
import { createContext, useContext, useState } from 'react'

const CycleContext = createContext({} as any)

export function Countdown() {
  const { activeCycle, setActiveCycle } = useContext(CycleContext) // indicando que vou usar o contexto e pego uma var por destructuring
  return (
    <h1>
      Countdown: {activeCycle}
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        Alterar
      </button>
    </h1>
  ) // e agora posso usar a variavel do contexto normalmente em qualquer lugar da aplicação
}

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  return <h1>NewCycleForm: {activeCycle}</h1>
}

export function Home() {
  // o estado precisa sempre ser colocado no componente mais por fora (componente pai), que
  // envolve os componentes que precisam usar o estado
  // o value recebe os valores que quero que o contexto disponibilize para os componentes
  const [activeCycle, setActiveCycle] = useState(0)
  return (
    <CycleContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <Countdown />
        <NewCycleForm />
      </div>
    </CycleContext.Provider>
  )
}
*/
