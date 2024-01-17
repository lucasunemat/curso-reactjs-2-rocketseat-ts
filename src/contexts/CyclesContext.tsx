// use essa técnica sempre que precisar do contexto para mais de uma rota (home, history...)

import { ReactNode, createContext, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// não to reaproveitando a tipagem do zod porque meu contexto não pode depender de biblioteca externa
interface createCycleData {
  task: string
  minutesAmount: number
}

// tipagem do contexto
interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void // função que marca o ciclo atual como finalizado, criei ela para facilitar compatilhamento na API
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: createCycleData) => void
  interruptCurrentCycle: () => void
}

// context API foi criada aqui
export const CyclesContext = createContext({} as CyclesContextType) // uso o as para assinar a interface como molde

// tipagem das propriedades do contexto
interface CyclesContextProviderProps {
  children: ReactNode // reactNode é qualquer coisa que o react aceita como conteúdo de tela (componentes html válidos, div, h1, etc)
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]) // esse estado sempre terá o array de ciclos mais atual em "cycles"
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null) // null porque no início não tem ciclo ativo. Esse estado anota o id do ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // quantidade de segundos que passaram desde que o ciclo começou

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID) // encontra o ciclo ativo

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    // defini ela aqui porque essa função usa o setCycles que só existe dentro do meu componente Home
    setCycles((state) =>
      state.map((cycle) => {
        // percorre todos os ciclos
        if (cycle.id === activeCycleID) {
          // se achar o ciclo atual
          return {
            ...cycle,
            finishedDate: new Date(), // retorna ele + info de finalizado (update)
          }
        } else {
          return cycle // se não achar, só retorna o ciclo, não faz nada
        }
      }),
    )
  }

  function createNewCycle(data: createCycleData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id, // criando id a partir do tempo atual
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]) // adicionando novo ciclo ao array de ciclos

    setActiveCycleID(id) // ativando o ciclo recem criado como ciclo atual

    setAmountSecondsPassed(0) // resetando o contador de segundos para que ele nao considere esses segundos passados em proximos ciclos

    // reset() // resetando o formulário usando função devolvida por useForm. Ele reseta para os valores defaultValues
  }

  function interruptCurrentCycle() {
    // esse código aqui é para setar informação de ciclo interrompido
    setCycles((state) =>
      state.map((cycle) => {
        // percorre todos os ciclos
        if (cycle.id === activeCycleID) {
          // se achar o ciclo atual
          return {
            ...cycle,
            interruptedDate: new Date(), // retorna ele + info de interrompido (update)
          }
        } else {
          return cycle // se não achar, só retorna o ciclo, não faz nada
        }
      }),
    )

    setActiveCycleID(null) // reseta o ciclo ativo
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleID,
        amountSecondsPassed,
        setSecondsPassed,
        markCurrentCycleAsFinished,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
