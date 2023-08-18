import {
    Result,
    ok,
    err,
    matchResult,
    matchResultF,
    ResultMatchers,
} from '../lib/index'

const okFn = (): Result<number> => {
    const value: number = 1
    return ok(value)
}

const errFn = (): Result<number> => {
    const error: Error = new Error('i am an error')
    return err(error)
}

const okOrErrFn = (): Result<number> => {
    const sources = [okFn, errFn]
    return sources[Math.floor(Math.random() * sources.length)]()
}

const okPromise = async (): Promise<Result<number>> => Promise.resolve(okFn())
const errPromise = async (): Promise<Result<number>> => Promise.resolve(errFn())
const anyPromise = async (): Promise<Result<number>> =>
    Promise.resolve(okOrErrFn())

// Basic usage - Functional
const resultOkMatchF = matchResultF({
    ok: (r) => r,
    err: (e) => e,
})(okFn())

const resultErrMatchF = matchResultF({
    ok: (r) => r,
    err: (e) => e,
})(errFn())

// Basic usage - non-functional
const resultOkMatch = matchResult({
    result: okFn(),
    matchers: { ok: (r) => r, err: (e) => e },
})

const resultErrMatch = matchResult({
    result: errFn(),
    matchers: { ok: (r) => r, err: (e) => e },
})

// Generic handling
const anyOrErrorMatchHandler: ResultMatchers<any, Error, any, Error> = {
    ok: (r: any) => r,
    err: (e: Error) => e,
}
const resultUnknownF = matchResultF(anyOrErrorMatchHandler)(okOrErrFn())

// Promises
matchResultF({
    ok: (r: number) => r,
    err: (e: Error) => e,
})(await okPromise())

matchResultF({
    ok: (r: number) => r,
    err: (e: Error) => e,
})(await errPromise())

matchResult({
    result: await anyPromise(),
    matchers: {
        ok: (r: number) => r,
        err: (e: Error) => e,
    },
})

// Chaining
