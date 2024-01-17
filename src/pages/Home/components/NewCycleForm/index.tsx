import { useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from '../../styles'
import { CyclesContext } from '../..'
/**
 * Duas formas principais de lidar com formulários no React:
 * **Controlled**:
 * mantenho cada input do usuário em um estado do React (foi o que fizemos no projeto de Ignite Feed)
 * e faço isso para cada input que tem no formulário
 * benefícios = tenho facil acesso ao valor atual do input, consigo visualizar alterações mais facilmente
 * desvantagens = a cada modificação (setTask) o React re-renderiza o componente inteiro. Se a aplicação
 * tiver vários componentes e muita complexidade, isso pode virar um gargalo.
 * situações de uso => formulários pequenos, com poucos inputs
 * **Uncontrolled**:
 * utiliza os eventos do html para manipular o formulario via onSubmit com funções (como aquelas handle)
 * benefícios = não precisa de um estado para cada input, mais performático
 * desvantagens = não temos acesso ao valor atual do input, não conseguimos visualizar alterações facilmente (perde fluidez)
 * situações de uso => formulários grandes, com muitos inputs (dashboards de cadastro, com 200, 300 inputs)
 */

/**
 * A register() é função que retorna várias funções;
 * function register (name: string) {
 *  return {
 *      onChange: () => void,
 *      onBlur: () => void,
 *      onFocus: () => void,
 * }
 * Quando colocamos {...register('task')} estamos passando todas as funções como propriedades do input
 * Ou seja, é a mesma coisa que eu colocar onChange, onBlur, onFocus manualmente e colocar uma função que faz alguma coisa
 * (coloquei função vazia ali no exemplo mas é apenas para ilustrar)
 */

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  // estamos desestruturando e pegando funções que são retornadas pelo useForm. Funções: register, handleSubmit
  // preciso passar interface NewCycleFormData para o useForm saber o tipo de dado que ele vai receber
  // Fluxo: handleSubmit -> handleCreateNewCycle -> newCycleFormValidationSchema
  // O tempo todo useForm está sendo usado e por isso preciso que ele tenha essa interface
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome ao seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle} // se tiver ciclo ativo, desabilita o input
        {...register('task')} // estamos setando qual o nome do meu input (por isso, não precisa colocar mais "name" no input)
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
        <option value="Projeto 5" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5} // step é o intervalo entre os números que o input aceita
        min={1} // valor mínimo que o input aceita
        // max={60} // valor máximo que o input aceita
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
        // aqui passamos parâmetro para indicar que esse input será um número
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
