import { test, describe, assert } from 'vitest'
import {
    some,
    none,
    right,
    left,
    Either,
    matchEitherF,
    matchEither,
} from '../lib'
import { pipe, andThen } from 'ramda'

describe('Either', () => {
    test('right', async () => {
        assert(right(42).value == 42)
    })
    test('left', async () => {
        const error = new Error('bad')
        assert(left(error).error === error)
    })
    test('either', async () => {
        const l: Either<Error, number> = left(new Error('bad'))
        const r: Either<Error, number> = right(42)
        assert(typeof l === typeof r)
    })
    test('match left', async () => {
        const result = matchEither({
            either: left(new Error('bad')),
            matchers: {
                left: (err) => 'default',
                right: (value: number) => value + 1,
            },
        })
        assert(result === 'default')
    })
    test('match right', async () => {
        const result = matchEither({
            either: right(41),
            matchers: {
                left: (err) => 'default',
                right: (value: number) => value + 1,
            },
        })
        assert(result === 42)
    })
    test('matchF left', async () => {
        const result = matchEitherF({
            left: (err) => 'default',
            right: (value: number) => value + 1,
        })(left(new Error('bad')))
        assert(result === 'default')
    })
    test('matchF right', async () => {
        const result = matchEitherF({
            left: (err) => 'default',
            right: (value: number) => value + 1,
        })(right(41))
        assert(result === 42)
    })
    test('matchF promise left', async () => {
        const p = pipe(
            () => Promise.resolve(none()),
            andThen(
                matchEitherF({
                    left: (err) => 'default',
                    right: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 'default')
    })
    test('matchF promise right', async () => {
        const p = pipe(
            () => Promise.resolve(some(41)),
            andThen(
                matchEitherF({
                    left: (err) => 'default',
                    right: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 42)
    })
})
