import { right, left, Either, matchEitherF } from '../lib'
import { andThen, pipe } from 'ramda'

// EITHER
const rightFn = (): Either<Error, number> => right(1) // { value: 1 }
const leftFn = (): Either<Error, number> => left(new Error('bad')) // { error: Error('bad) }

const inputFn = (input: number) => input

console.log(`[EITHER] rightFn is ${JSON.stringify(rightFn())}`)
console.log(`[EITHER] leftFn is ${JSON.stringify(leftFn())}`)

const syncPipeline1 = pipe(
    rightFn,
    matchEitherF<Error, number, Error, number>({
        right: (result) => inputFn(result),
        left: (err) => err,
    }),
) // { value: 1 } => inputFn(1) => 1

const syncPipeline2 = pipe(
    leftFn,
    matchEitherF<Error, number, Error, number>({
        right: (result) => inputFn(result),
        left: (err) => err,
    }),
) // { error: Error('bad') } => Error('bad')

console.log(`[EITHER] syncPipeline1 is ${JSON.stringify(syncPipeline1())}`)
console.log(`[EITHER] syncPipeline2 is ${JSON.stringify(syncPipeline2())}`)

const rightPromise = (): Promise<Either<Error, number>> =>
    Promise.resolve(rightFn())
const leftPromise = (): Promise<Either<Error, number>> =>
    Promise.resolve(leftFn())

const inputPromise = async (input: any) => Promise.resolve(input)

const asyncPipeline1 = pipe(
    rightPromise,
    andThen(
        matchEitherF<Error, number, Error, number>({
            right: (result) => result,
            left: (err) => err,
        }),
    ),
) // { value: 1 } => 1

const asyncPipeline2 = pipe(
    leftPromise,
    andThen(
        matchEitherF<Error, number, Error, number>({
            right: (result) => result,
            left: (err) => err,
        }),
    ),
) // { error: Error('bad') } => Error('bad')

const asyncPipeline3 = pipe(
    rightPromise,
    andThen(inputPromise),
    andThen(
        matchEitherF<Error, number, Error, number>({
            right: (result) => result,
            left: (err) => err,
        }),
    ),
) // { value: 1 } => input(1) => 1

asyncPipeline1().then((result) =>
    console.log(`[EITHER] asyncPipeline1 is ${JSON.stringify(result)}`),
)
asyncPipeline2().then((result) =>
    console.log(`[EITHER] asyncPipeline2 is ${result}`),
)
asyncPipeline3().then((result) =>
    console.log(`[EITHER] asyncPipeline3 is ${JSON.stringify(result)}`),
)
