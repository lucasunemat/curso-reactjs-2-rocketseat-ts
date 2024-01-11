import { createContext, useContext, useState } from 'react'

const CycleContext = createContext({
  activeCycle: 1, // valor inicial
})

export function Countdown() {
  let { activeCycle } = useContext(CycleContext) // indicando que vou usar o contexto e pego uma var por destructuring
  return (
    <h1>
      Countdown: {activeCycle}
      <button
        onClick={() => {
          activeCycle = 4
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
  // veja que uso destrucutring para pegar o valor até quando preciso colocar na prop "value" (dúvida: activeCycle é o activeCycle do useState?)
  const [activeCycle, setActiveCycle] = useState(0)
  return (
    <CycleContext.Provider value={{ activeCycle }}>
      <div>
        <Countdown />
        <NewCycleForm />
      </div>
    </CycleContext.Provider>
  )
}
