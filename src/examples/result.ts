import { ok, err, matchResultF, Result } from '../lib'
import { andThen, pipe } from 'ramda'

// RESULT
const okFn = (): Result<number, Error> => ok(1)
const errFn = (): Result<number, Error> => err(new Error('bad'))
const rinputFn = (input: number) => input

console.log(`[RESULT] okFn is ${JSON.stringify(okFn())}`)
console.log(`[RESULT] errFn ${JSON.stringify(errFn())}`)

const rsyncPipeline1 = pipe(
    okFn,
    matchResultF<number, Error, number, Error>({
        ok: (result) => rinputFn(result),
        err: (err) => err,
    }),
) // { value: 1 } => rinputFn(1) => 1

const rsyncPipeline2 = pipe(
    errFn,
    matchResultF<number, Error, number, Error>({
        ok: (result) => rinputFn(result),
        err: (err) => err,
    }),
) // { error: Error('bad') } => Error('bad')

console.log(`[RESULT] rsyncPipeline1 is ${JSON.stringify(rsyncPipeline1())}`)
console.log(`[RESULT] rsyncPipeline2 is ${JSON.stringify(rsyncPipeline2())}`)

const rrightPromise = (): Promise<Result<number, Error>> =>
    Promise.resolve(okFn())
const rleftPromise = (): Promise<Result<number, Error>> =>
    Promise.resolve(errFn())

const rinputPromise = async (input: any) => Promise.resolve(input)

const rasyncPipeline1 = pipe(
    rrightPromise,
    andThen(
        matchResultF<number, Error, number, Error>({
            ok: (result) => result,
            err: (err) => err,
        }),
    ),
) // { value: 1 } => 1

const rasyncPipeline2 = pipe(
    rleftPromise,
    andThen(
        matchResultF<number, Error, number, Error>({
            ok: (result) => result,
            err: (err) => err,
        }),
    ),
) // { error: Error('bad') } => Error('bad')

const rasyncPipeline3 = pipe(
    rrightPromise,
    andThen(rinputPromise),
    andThen(
        matchResultF<number, Error, number, Error>({
            ok: (result) => result,
            err: (err) => err,
        }),
    ),
) // { value: 1 } => rinput(1) => 1

rasyncPipeline1().then((result) =>
    console.log(`[RESULT] rasyncPipeline1 is ${JSON.stringify(result)}`),
)
rasyncPipeline2().then((result) =>
    console.log(`[RESULT] rasyncPipeline2 is ${result}`),
)
rasyncPipeline3().then((result) =>
    console.log(`[RESULT] rasyncPipeline3 is ${JSON.stringify(result)}`),
)
