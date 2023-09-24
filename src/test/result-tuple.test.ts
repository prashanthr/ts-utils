import { test, describe, assert } from 'vitest'
import { MaybeResult, MaybeError, ResultTuple, toTuple } from '../lib'
// import { pipe, andThen } from 'ramda'

describe('Result Tuple', () => {
    test('MaybeResult', async () => {
        const number = 1
        const maybeResult: MaybeResult<number> = number
        assert(typeof number === typeof maybeResult)
    })
    test('MaybeError', async () => {
        const error = new Error('e')
        const maybeError: MaybeError<Error> = error
        assert(typeof error === typeof maybeError)
    })
    test('undefined', async () => {
        const number = undefined
        const error = undefined
        const maybeResult: MaybeResult<number> = number
        const maybeError: MaybeError<Error> = error
        assert(typeof number === typeof maybeResult)
        assert(typeof error === typeof maybeError)
    })
    test('toTuple with result only', async () => {
        const result = 1
        const res = toTuple({ result })
        assert(res[0] === result)
        assert(res[1] === undefined)
    })
    test('toTuple with result only', async () => {
        const result = 1
        const res = toTuple({ result })
        assert(res[0] === result)
        assert(res[1] === undefined)
    })
    test('toTuple with error but specifying result type', async () => {
        const error = new Error('e')
        const res = toTuple({ error })
        assert(res[0] === undefined)
        assert(res[1] === error)
    })
    test('toTuple with no arguments but specifying result type', async () => {
        const res = toTuple({})
        assert(res[0] === undefined)
        assert(res[1] === undefined)
    })
    test('toTuple with custom error type', async () => {
        const error = 'baz'
        const res = toTuple({ error })
        assert(res[0] === undefined)
        assert(res[1] === error)
    })
    test('Promise', async () => {
        const result = 1
        const aFn = async () => Promise.resolve(toTuple({ result }))
        const unwrapped = await aFn()
        assert(unwrapped[0] === result)
        assert(unwrapped[1] === undefined)
    })
})
