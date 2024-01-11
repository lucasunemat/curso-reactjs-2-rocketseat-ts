import { FormContainer, MinutesAmountInput, TaskInput } from '../../styles'
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
// esse é o objeto validador
const newCycleFormValidationSchema = zod.object({
  // digo que a chave task precisa ser string com minimo 1 caractere e se nao tiver, passe essa msg par usuario
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod
    .number()
    .min(1, 'Ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'Ciclo precisa ser de no máximo 60 minutos!'),
})

// aqui estou criando um tipo a partir do objeto acima. É uma função do zod.
// além disso, veja que sempre que referencio variavel JS dentro do TS, preciso colocar "typeof" + nomeDaVariavel
// essa função infer faz o zod meio que criar um type a partir do objeto validador que eu mandei
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export function NewCycleForm() {
  // estamos desestruturando e pegando funções que são retornadas pelo useForm. Funções: register, handleSubmit
  // preciso passar interface NewCycleFormData para o useForm saber o tipo de dado que ele vai receber
  // Fluxo: handleSubmit -> handleCreateNewCycle -> newCycleFormValidationSchema
  // O tempo todo useForm está sendo usado e por isso preciso que ele tenha essa interface
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // passo a função validadora dentro do zodResolver
    defaultValues: { task: '', minutesAmount: 0 },
  })
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
