import { test, describe, assert } from 'vitest'
import { ok, err, matchResultF, Result } from '../lib'
import { pipe, andThen } from 'ramda'

describe('Result', () => {
    test('ok', async () => {
        assert(ok(1).value == 1)
    })
    test('err', async () => {
        const error = new Error('bad')
        assert(err(error).error === error)
    })
    test('result', async () => {
        const s: Result<number, Error> = err(new Error('bad'))
        const n: Result<number, Error> = ok(1)
        assert(typeof s === typeof n)
    })
    test('result inferred', async () => {
        const s: Result<number> = err(new Error('bad'))
        const n: Result<number> = ok(1)
        assert(typeof s === typeof n)
    })
    test('match err', async () => {
        const result = matchResultF({
            err: (err) => 'default',
            ok: (value: number) => value + 1,
        })(err(new Error('bad')))
        assert(result === 'default')
    })
    test('match ok', async () => {
        const result = matchResultF({
            err: (err) => 'default',
            ok: (value: number) => value + 1,
        })(ok(1))
        assert(result === 2)
    })
    test('match promise err', async () => {
        const p = pipe(
            () => Promise.resolve(err(new Error('bad'))),
            andThen(
                matchResultF({
                    err: (err) => 'default',
                    ok: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 'default')
    })
    test('match promise ok', async () => {
        const p = pipe(
            () => Promise.resolve(ok(1)),
            andThen(
                matchResultF({
                    err: (err) => 'default',
                    ok: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 2)
    })
})
