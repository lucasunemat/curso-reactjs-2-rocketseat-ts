// componentes locais você joga na pasta components da página

import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from '../../styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'

export function Countdown() {
  const { activeCycle, activeCycleID } = useContext(CyclesContext) // pego o ciclo ativo da context API criada lá na home.tsx

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // quantidade de segundos que passaram desde que o ciclo começou

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // total em segundos do ciclo atual

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        // guardo diferença em segundos numa constante
        const secondsDiffernce = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        // tratamento para caso o ciclo já tenha terminado (diferença em segundos superou o total de segundos do ciclo)
        if (secondsDiffernce >= totalSeconds) {
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

          setAmountSecondsPassed(totalSeconds) // seta a quantidade de segundos passados como o total de segundos do ciclo
          clearInterval(interval) // limpa o intervalo para que ele não continue rodando (e não continue atualizando o contador de segundos
        } else {
          setAmountSecondsPassed(secondsDiffernce)
          // se não tiver acabo o ciclo, seta a diferença em segundos do tempo atual para o tempo em que o ciclo começou
          // isso vai fazer o contador ir atualizando
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleID, cycles, totalSeconds])

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

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
