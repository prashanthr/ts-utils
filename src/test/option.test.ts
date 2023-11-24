import { test, describe, assert } from 'vitest'
import { some, none, Option, matchOptionF, matchOption } from '../lib'
import { pipe, andThen } from 'ramda'

describe('Option', () => {
    test('some', async () => {
        assert(some(42).value == 42)
    })
    test('none', async () => {
        assert(typeof none() === typeof {}, '')
    })
    test('option', async () => {
        const s: Option<number> = some(42)
        const n: Option<number> = none()
        assert(typeof s === typeof n)
    })
    test('match none', async () => {
        const result = matchOption({
            option: none(),
            matchers: {
                none: () => 'default',
                some: (value: number) => value + 1,
            },
        })
        assert(result === 'default')
    })
    test('match some', async () => {
        const result = matchOption({
            option: some(41),
            matchers: {
                none: () => 'default',
                some: (value: number) => value + 1,
            },
        })
        assert(result === 42)
    })
    test('matchF none', async () => {
        const result = matchOptionF({
            none: () => 'default',
            some: (value: number) => value + 1,
        })(none())
        assert(result === 'default')
    })
    test('matchF some', async () => {
        const result = matchOptionF({
            none: () => 'default',
            some: (value: number) => value + 1,
        })(some(41))
        assert(result === 42)
    })
    test('matchF promise none', async () => {
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
    test('matchF promise some', async () => {
        const p = pipe(
            () => Promise.resolve(some(41)),
            andThen(
                matchOptionF({
                    none: () => 'default',
                    some: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 42)
    })
})
