import { test, describe, assert } from 'vitest'
import { some, none, right, left, Either, matchEitherF } from '../lib'
import { pipe, andThen } from 'ramda'

describe('Either', () => {
    test('right', async () => {
        assert(right(1).value == 1)
    })
    test('left', async () => {
        const error = new Error('bad')
        assert(left(error).error === error)
    })
    test('either', async () => {
        const s: Either<Error, number> = left(new Error('bad'))
        const n: Either<Error, number> = right(1)
        assert(typeof s === typeof n)
    })
    test('match left', async () => {
        const result = matchEitherF({
            left: (err) => 'default',
            right: (value: number) => value + 1,
        })(left(new Error('bad')))
        assert(result === 'default')
    })
    test('match right', async () => {
        const result = matchEitherF({
            left: (err) => 'default',
            right: (value: number) => value + 1,
        })(right(1))
        assert(result === 2)
    })
    test('match promise left', async () => {
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
    test('match promise right', async () => {
        const p = pipe(
            () => Promise.resolve(some(1)),
            andThen(
                matchEitherF({
                    left: (err) => 'default',
                    right: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 2)
    })
})
