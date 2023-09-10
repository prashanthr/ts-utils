import { test, describe, assert } from 'vitest'
import { some, none, Option, matchOptionF } from '../lib'
import { pipe, andThen } from 'ramda'

describe('Option', () => {
    test('some', async () => {
        assert(some(1).value == 1)
    })
    test('none', async () => {
        assert(typeof none() === typeof {}, '')
    })
    test('option', async () => {
        const s: Option<number> = some(1)
        const n: Option<number> = none()
        assert(typeof s === typeof n)
    })
    test('match left', async () => {
        const result = matchOptionF({
            none: () => 'default',
            some: (value: number) => value + 1,
        })(none())
        assert(result === 'default')
    })
    test('match right', async () => {
        const result = matchOptionF({
            none: () => 'default',
            some: (value: number) => value + 1,
        })(some(1))
        assert(result === 2)
    })
    test('match promise left', async () => {
        const p = pipe(
            () => Promise.resolve(none()),
            andThen(
                matchOptionF({
                    none: () => 'default',
                    some: (value: number) => value + 1,
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
                matchOptionF({
                    none: () => 'default',
                    some: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 2)
    })
})
