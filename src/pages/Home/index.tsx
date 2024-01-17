/* sim, páginas são componentes, também */
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // uso essa sintaxa porque, se clicares no 'zod' com ctrl, veras que ele não tem export default
import { /* useEffect */ useContext } from 'react'
// import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

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

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // passo a função validadora dentro do zodResolver
    defaultValues: { task: '', minutesAmount: 0 },
  })

  // essa var recebe as funções que o useForm retorna e eu lanço ela com spread operator la no FormProvider para o NewCycleForm usar o register que ele precisa
  const { handleSubmit, watch /* reset */ } = newCycleForm

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

  // o handleSubmit recebe como parâmetro uma função minha que vai ser executada quando o usuário der submit no formulário
  /*
   * Prop drills: quando tenho que ficar elencando várias propriedades em componentes apenas para passar variaveis ou funções
   ** para o componente-filho
   * Para evitar isso, uso o Context API => ajuda a compartilhar informações entre vários componentes ao mesmo tempo
   */
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton
            type="button" /* tipo button pq não quero fazer submit, só interromper mesmo */
            onClick={interruptCurrentCycle}
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
