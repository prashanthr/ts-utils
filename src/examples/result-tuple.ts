import { ResultT, ErrorT, ResultTuple, TupleArgs, toTuple } from '../lib'

const result: ResultT<number> = 42
const error: ErrorT = new Error('e')
const error2: ErrorT<Error> = new Error('e')

class CustomError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}
const error3: ErrorT<CustomError> = new CustomError('custom error')

const resultTuple: ResultTuple<number> = [42, undefined]
const resultTuple2: ResultTuple<number, Error> = [42, undefined]
const resultTuple3: ResultTuple<number> = [undefined, new Error('e')]
const resultTuple4: ResultTuple<number, Error> = [undefined, new Error('e')]

const fn1 = (): ResultTuple<number> => {
    return toTuple({ result: 42 }) // [42, undefined]
}

const fn2 = (): ResultTuple<number> => {
    return toTuple<number>({
        result: 42,
        error: undefined,
    }) // [42, undefined]
}

const fn3 = (): ResultTuple<number> => {
    return toTuple({ error: new Error('e') }) // [undefined, Error('e')]
}

const fn4 = (): ResultTuple<number> => {
    return toTuple({}) // [undefined, undefined]
}

const fn5 = (): ResultTuple<number, Error> => {
    return toTuple({}) // throws Error
}

const fn6 = (): ResultTuple<number, 'baz'> => {
    return toTuple({ error: 'baz' }) // [undefined, baz]
}

const aPromise = async (): Promise<ResultTuple<number>> =>
    Promise.resolve(toTuple({ result: 42 }))

const fn7 = async (): Promise<any> => {
    const [result, error] = await aPromise()
    if (error) {
        // do something with error
    } else {
        // do something with result
    }
}
