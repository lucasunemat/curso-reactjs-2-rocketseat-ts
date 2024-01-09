/* sim, páginas são componentes, também */
import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // uso essa sintaxa porque, se clicares no 'zod' com ctrl, veras que ele não tem export default
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

// o envio do formulario retorna um objeto, portanto começo com zod.object
const newCycleFormValidationSchema = zod.object({
  // digo que a chave task precisa ser string com minimo 1 caractere e se nao tiver, passe essa msg par usuario
  task: zod.string().min(1, 'Informe a tarefa!'),
  number: zod
    .number()
    .min(5, 'Ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'Ciclo precisa ser de no máximo 60 minutos!'),
})

export function Home() {
  /*
   * useForm é um HOOK
   * um hook é uma função que começa com use
   * ela acopla uma funcionalidade ao componente
   */

  /**
   * handleSubmit pega a minha função de submit handleCreateNewCycle e passa as info do input para ela processar
   */

  // estamos desestruturando e pegando funções que são retornadas pelo useForm. Funções: register, handleSubmit
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema), // passo a função validadora dentro do zodResolver
  })

  // watch é uma função que recebe o nome do input e retorna o valor atual dele, para observermos em tempo real
  // com ele, posso fazer ativação e desativação do botão começar, por exemplo
  // se não tá retornando nada, então desativo o botão ( disabled = {!task} )
  // o uso de task torna o formulário controlado (controlled component)
  const task = watch('task')
  // variavel auxiliar para melhorar legibilidade do código
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: unknown) {
    console.log(data)
  }

  console.log(formState.errors) // aqui eu consigo ver os erros que o zod está retornando

  // o handleSubmit recebe como parâmetro uma função minha que vai ser executada quando o usuário der submit no formulário
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome ao seu projeto"
            list="task-suggestions"
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
            min={5} // valor mínimo que o input aceita
            // max={60} // valor máximo que o input aceita
            {...register('minutesAmount', { valueAsNumber: true })}
            // aqui passamos parâmetro para indicar que esse input será um número
          />

          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
