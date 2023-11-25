import { Option, some, none, matchOptionF } from '../lib'
import { pipe } from 'ramda'

// OPTION
const someValue: Option<number> = some(42) // { value: 42 }
const noValue: Option<number> = none() // {}

console.log(`[OPTION] someValue is ${JSON.stringify(someValue)}`)
console.log(`[OPTION] noValue is ${JSON.stringify(noValue)}`)

const optionPipeline1 = pipe(
    () => someValue,
    matchOptionF({
        some: (value) => value,
        none: () => undefined,
    }),
) // some(42) aka { value: 42 } => 42

const optionPipeline2 = pipe(
    () => noValue,
    matchOptionF({
        some: (value) => value,
        none: () => 'default',
    }),
) // none() aka {} => 'default'

console.log(`[OPTION] optionPipeline1 is ${JSON.stringify(optionPipeline1())}`)
console.log(`[OPTION] optionPipeline2 is ${JSON.stringify(optionPipeline2())}`)
