// componentes locais você joga na pasta components da página

import { useEffect, useState } from 'react'
import { CountdownContainer, Separator } from '../../styles'
import { differenceInSeconds } from 'date-fns'

interface CountdownProps {
  activeCycle: any
  setCycles: any
  activeCycleID: any
}

export function Countdown({
  activeCycle,
  setCycles,
  activeCycleID,
}: CountdownProps) {
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
