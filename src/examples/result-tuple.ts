import { MaybeResult, MaybeError, ResultTuple, toTuple } from '../lib'

const maybeResult: MaybeResult<number> = 1
const maybeResult2: MaybeResult<number> = undefined
const maybeResult3: MaybeResult<number> = null
const maybeResult4: MaybeResult<number, 'bar'> = 'bar'

const maybeError: MaybeError = new Error('e')
const maybeError2: MaybeError = undefined
const maybeError3: MaybeError<Error> = new Error('e')
const maybeError4: MaybeError<Error> = undefined
const maybeError5: MaybeError<Error, 'bar'> = 'bar'

class CustomError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}
const maybeError6: MaybeError<CustomError> = new CustomError('custom error')

const resultTuple: ResultTuple<number> = [1, undefined]
const resultTuple2: ResultTuple<number, Error> = [1, undefined]
const resultTuple3: ResultTuple<number> = [undefined, new Error('e')]
const resultTuple4: ResultTuple<number, Error> = [undefined, new Error('e')]
const resultTuple5: ResultTuple<number, Error, 'baz'> = [1, 'baz']
const resultTuple6: ResultTuple<number, Error, 'baz'> = ['baz', new Error('e')]

const fn1 = (): ResultTuple<number> => {
    return toTuple({ result: 1 }) // [1, undefined]
}

const fn2 = (): ResultTuple<number> => {
    return toTuple({ result: 1, error: undefined }) // [1, undefined]
}

const fn3 = (): ResultTuple<number> => {
    return toTuple({ error: new Error('e') }) // [undefined, Error('e')]
}

const fn4 = (): ResultTuple<number> => {
    return toTuple({}) // [undefined, undefined]
}

const fn5 = (): ResultTuple<number, Error> => {
    return toTuple({}) // [undefined, undefined]
}

const fn6 = (): ResultTuple<number, 'baz'> => {
    return toTuple({ error: 'baz' }) // [undefined, baz]
}

const aPromise = async (): Promise<ResultTuple<number>> =>
    Promise.resolve(toTuple({ result: 1 }))

const fn7 = async (): Promise<any> => {
    const [result, error] = await aPromise()
    if (error) {
        // do something with error
    } else {
        // do something with result
    }
}
