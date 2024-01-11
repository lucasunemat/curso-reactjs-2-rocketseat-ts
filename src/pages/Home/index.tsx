/* sim, páginas são componentes, também */
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // uso essa sintaxa porque, se clicares no 'zod' com ctrl, veras que ele não tem export default
import { useState, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]) // esse estado sempre terá o array de ciclos mais atual em "cycles"
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null) // null porque no início não tem ciclo ativo. Esse estado anota o id do ciclo ativo

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)

  // obs: sempre que eu uso uma variavel externa no useEffect, preciso colocar ela no array de dependencias

  /*
   * useForm é um HOOK
   * um hook é uma função que começa com use
   * ela acopla uma funcionalidade ao componente
   */

  /**
   * handleSubmit pega a minha função de submit handleCreateNewCycle e passa as info do input para ela processar
   */

  // watch é uma função que recebe o nome do input e retorna o valor atual dele, para observermos em tempo real
  // com ele, posso fazer ativação e desativação do botão começar, por exemplo
  // se não tá retornando nada, então desativo o botão ( disabled = {!task} )
  // o uso de task torna o formulário controlado (controlled component)
  const task = watch('task')
  // variavel auxiliar para melhorar legibilidade do código
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
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

    reset() // resetando o formulário usando função devolvida por useForm. Ele reseta para os valores defaultValues
  }

  function handleInterruptCycle() {
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

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // essa currentSeconds que exibo em tela

  // Math.floor arredonda para baixo (pomodoro de 25 ao passar 1 s eu já posso exibir 24 no display)
  // around: de cinco pra cima, floor: para baixo, ceil: para cima
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60 // resto da divisão por 60, no caso de 25 minutos, é 0,8333 se passou 1 segundo

  const minutes = String(minutesAmount).padStart(2, '0') // se tiver 1 minuto, exibe 01. Isso faz sempre eu ter dois caracteres. se tiver só 1 numero para exibir, preenche o começo com zero (por isso padSTART)
  const seconds = String(secondsAmount).padStart(2, '0')
  // console.log(formState.errors) // aqui eu consigo ver os erros que o zod está retornando (tem que desestruturar o formState do useForm)

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - Pomodoro`
    }
  }, [minutes, seconds, activeCycle])

  console.log(cycles)

  // o handleSubmit recebe como parâmetro uma função minha que vai ser executada quando o usuário der submit no formulário
  /*
   * Prop drills: quando tenho que ficar elencando várias propriedades em componentes apenas para passar variaveis ou funções
   ** para o componente-filho
   * Para evitar isso, uso o Context API => ajuda a compartilhar informações entre vários componentes ao mesmo tempo
   */
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleID={activeCycleID}
        />
        {activeCycle ? (
          <StopCountdownButton
            type="button" /* tipo button pq não quero fazer submit, só interromper mesmo */
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
