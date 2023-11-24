import { test, describe, assert } from 'vitest'
import { ok, err, matchResultF, matchResult, Result } from '../lib'
import { pipe, andThen } from 'ramda'

describe('Result', () => {
    test('ok', async () => {
        assert(ok(42).value == 42)
    })
    test('err', async () => {
        const error = new Error('bad')
        assert(err(error).error === error)
    })
    test('result', async () => {
        const e: Result<number, Error> = err(new Error('bad'))
        const r: Result<number, Error> = ok(42)
        assert(typeof e === typeof r)
    })
    test('result inferred', async () => {
        const e: Result<number> = err(new Error('bad'))
        const r: Result<number> = ok(42)
        assert(typeof e === typeof r)
    })
    test('match err', async () => {
        const result = matchResultF({
            err: (err) => 'default',
            ok: (value: number) => value + 1,
        })(err(new Error('bad')))
        assert(result === 'default')
    })
    test('match ok', async () => {
        const result = matchResult({
            result: ok(41),
            matchers: {
                err: (err) => 'default',
                ok: (value: number) => value + 1,
            },
        })
        assert(result === 42)
    })
    test('match err', async () => {
        const result = matchResult({
            result: err(new Error('bad')),
            matchers: {
                err: (err) => 'default',
                ok: (value: number) => value + 1,
            },
        })
        assert(result === 'default')
    })
    test('matchF ok', async () => {
        const result = matchResultF({
            err: (err) => 'default',
            ok: (value: number) => value + 1,
        })(ok(41))
        assert(result === 42)
    })
    test('matchF err', async () => {
        const result = matchResultF({
            err: (err) => 'default',
            ok: (value: number) => value + 1,
        })(err(new Error('bad')))
        assert(result === 'default')
    })
    test('matchF promise err', async () => {
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
    test('matchF promise ok', async () => {
        const p = pipe(
            () => Promise.resolve(ok(41)),
            andThen(
                matchResultF({
                    err: (err) => 'default',
                    ok: (value: number) => value + 1,
                }),
            ),
        )
        const result = await p()
        assert(result === 42)
    })
})
