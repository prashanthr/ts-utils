// result.ts

/**
 * The Result.Ok type. The value can be of any type T
 */
export type Ok<T> = { value: T }

/**
 * The Result.Err type. The value can be of any type E
 */
export type Err<E> = { error: E }

/**
 * The Result type.
 * It is a union of the Result.Ok<T> and Result.Err<E> types
 * The Result.Err type defaults to Error
 */
export type Result<T, E = Error> = Ok<T> | Err<E>

/**
 * A wrapper utility for the Result.Ok type
 * @param value Any value of type T
 * @returns Ok<T>
 */
export const ok = <T>(value: T): Ok<T> => ({ value })

/**
 * A wrapper utility for the Result.Err type
 * @param error Any value of type E, commonly used for Errors
 * @returns Err<E>
 */
export const err = <E>(error: E): Err<E> => ({ error })

/**
 * The Matcher interface for the Result type with ok and err trees.
 */
export interface Matchers<T, E extends Error, R1, R2> {
    ok(value: T): R1
    err(error: E): R2
}

/**
 * A functional match utility for the Result type
 * Use as: matchF({ ok: value => value + 1, err: err => throw err })(ok(41))
 * @param matchers Matchers object for Result type
 * @returns The result of the evaluated match tree
 */
export const matchF =
    <T, E extends Error, R1, R2>(matchers: Matchers<T, E, R1, R2>) =>
    (result: Result<T, E>) =>
        'value' in result
            ? matchers.ok(result.value)
            : matchers.err(result.error)

/**
 * A non-functional match utility for the Result type
 * @param { either, matchers } An object that takes the result value and a matchers object
 * @returns The result of the evaluated match tree
 */
export const match = <T, E extends Error, R1, R2>({
    result,
    matchers,
}: {
    result: Result<T, E>
    matchers: Matchers<T, E, R1, R2>
}) =>
    'value' in result ? matchers.ok(result.value) : matchers.err(result.error)
