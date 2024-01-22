import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleID: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // retorna o estado atual + o novo ciclo (mesma regra que eu acionava com setCycles (state => [...state, newCycle]))
      // esse return é o novo valor que queremos que o estado tenha

      // sem o immer:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle], // retorna os ciclos, mas adiciona o novo ciclo no final
      //   activeCycleID: action.payload.newCycle.id, // ativa o ciclo recem criado colocando o id dele como atual
      // }

      // com immer:
      // basicamente posso usar metodos normais de JS que são mutáveis mas o immer vai fazer a imutabilidade pra mim
      // ou seja é como se ele fizesse o [...state.cycles, action.payload.newCycle] por baixo dos panos
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleID = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleID) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleID: null,
      // }
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleID = null // serve para desativar o ciclo atual
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    // se o findIndex achar -1 (ou seja, não encontrou ciclo ativo)

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleID) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleID: null,
      // }

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleID = null // serve para desativar o ciclo atual
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state // se não for a ação que eu quero, retorna o estado atual
  }
}
