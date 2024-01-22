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
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle], // retorna os ciclos, mas adiciona o novo ciclo no final
        activeCycleID: action.payload.newCycle.id, // ativa o ciclo recem criado colocando o id dele como atual
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleID: null,
      }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleID: null,
      }

    default:
      return state
  }
  return state // se não for a ação que eu quero, retorna o estado atual
}
