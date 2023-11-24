import { test, describe, assert, expect } from 'vitest'
import { ResultT, ErrorT, ResultTuple, toTuple } from '../lib'

describe('Result Tuple', () => {
    test('ResultT', async () => {
        const number = 42
        const maybeResult: ResultT<number> = number
        assert(typeof number === typeof maybeResult)
    })
    test('ErrorT', async () => {
        const error = new Error('e')
        const maybeError: ErrorT<Error> = error
        assert(typeof error === typeof maybeError)
    })
    test('toTuple with result only', async () => {
        const result = 42
        const res = toTuple({ result })
        assert(res[0] === result)
        assert(res[1] === undefined)
    })
    test('toTuple with error only', async () => {
        const error = new Error('e')
        const res = toTuple({ error })
        assert(res[0] === undefined)
        assert(res[1] === error)
    })
    test('toTuple with no arguments', async () => {
        expect(() => toTuple({})).toThrowError(
            'Error: At least one of error or result must be passed in to toTuple',
        )
    })
    test('toTuple with custom error type', async () => {
        const error = 'baz'
        const res = toTuple({ error })
        assert(res[0] === undefined)
        assert(res[1] === error)
    })
    test('Promise', async () => {
        const result = 42
        const aFn = async () => Promise.resolve(toTuple({ result }))
        const unwrapped = await aFn()
        assert(unwrapped[0] === result)
        assert(unwrapped[1] === undefined)
    })
    test('Promise usage', async () => {
        const number: number = 42
        const anError: Error = new Error('e')
        const aResultPromise = async (): Promise<ResultTuple<number>> =>
            Promise.resolve(toTuple({ result: 42 }))
        const anErrorPromise = async (): Promise<ResultTuple<number>> =>
            Promise.resolve(toTuple({ error: anError }))

        const [result, error] = await aResultPromise()
        assert(error === undefined)
        assert(result === number)
        const [result2, error2] = await anErrorPromise()
        assert(result2 === undefined)
        assert(error2 === anError)
    })
})
