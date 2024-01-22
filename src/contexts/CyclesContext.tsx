/*
 * Use essa técnica sempre que precisar do contexto para mais de uma rota (home, history...)
 * Importante: contextos devem depender só de coisas do proprio react, ou de bibliotecas que
 ** só usamos nele e não estão presentes no restante do código
 */

import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'

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
  /*
   * Esse estado sempre terá o array de ciclos mais atual em "cycles"
   * O valor que tem depois da função dentro de useReducer é o valor inicial do estado (um array
   * de cycles vazio)
   * A função do useReducer recebe o estado atual (state) e a ação que eu quero executar (action)
   * com isso, o setCycles não vai ser mais um alterador direto de cycles, mas um método para
   * disparar minha ação dentro do reducer
   * Renomeei para dispatch (antigo setCycles)
   */

  // cyclesReducer tem toda a regra de negócio para manipular os ciclos
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleID: null,
  })

  // desde que colocou o reducer, não preciso mais do estado abaixo
  // const [activeCycleID, setActiveCycleID] = useState<string | null>(null) // null porque no início não tem ciclo ativo. Esse estado anota o id do ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // quantidade de segundos que passaram desde que o ciclo começou

  const { cycles, activeCycleID } = cyclesState // desestruturando o estado para pegar os valores que quero

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID) // encontra o ciclo ativo

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    // define ela aqui porque essa função usa o setCycles que só existe dentro do meu componente Home
    dispatch(markCurrentCycleAsFinishedAction()) // disparando ação para o reducer
  }

  function createNewCycle(data: createCycleData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id, // criando id a partir do tempo atual
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // setCycles((state) => [...state, newCycle]) // adicionando novo ciclo ao array de ciclos
    // veja agora que preciso passar o tipo de ação (add new cycle) e depois, em payload, a var
    // com dados que quero adicionar
    dispatch(addNewCycleAction(newCycle)) // disparando ação para o reducer

    // não precisa mais da linha abaixo porque o reducer já faz isso
    // setActiveCycleID(id) // ativando o ciclo recem criado como ciclo atual

    setAmountSecondsPassed(0) // resetando o contador de segundos para que ele nao considere esses segundos passados em proximos ciclos

    // reset() // resetando o formulário usando função devolvida por useForm. Ele reseta para os valores defaultValues
  }

  function interruptCurrentCycle() {
    // esse código aqui é para setar informação de ciclo interrompido
    // o valor jogado dentro do dispatch() vai ir no lugar da "action" do reduce e vai disparar a função dele
    // aqui no caso eu jogo a var que quero manipular lá na função do reducer
    dispatch(interruptCurrentCycleAction())
  }

  // children indica todo conteudo que está dentro do componente (elementos html)
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
