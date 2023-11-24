// either.ts

/**
 * The Either.Right type. The value can be of any type T
 */
export type Right<T> = { value: T }

/**
 * The Either.Left type. The value can be of any type E
 */
export type Left<E> = { error: E }

/**
 * The Either type.
 * It is a union of the Either.Right<T> and Either.Left<E> types
 */
export type Either<E, T> = Right<T> | Left<E>

/**
 * A wrapper utility for the Either Right type
 * @param value Any value of type T
 * @returns Right<T>
 */
export const right = <T>(value: T): Right<T> => ({ value })

/**
 * A wrapper utility for the Either Left type
 * @param value Any value of type E, commonly used for Errors
 * @returns Left<E>
 */
export const left = <E>(error: E): Left<E> => ({ error })

/**
 * The Matcher interface for the Either type with left and right trees.
 */
export interface Matchers<E extends Error, T, R1, R2> {
    left(error: E): R1
    right(value: T): R2
}

/**
 * A functional match utility for the Either type
 * Use as: matchF({ right: value => value + 1, left: err => throw err })(right(41))
 * @param matchers Matchers object for Either type
 * @returns The result of the evaluated match tree
 */
export const matchF =
    <E extends Error, T, R1, R2>(matchers: Matchers<E, T, R1, R2>) =>
    (either: Either<E, T>) =>
        'value' in either
            ? matchers.right(either.value)
            : matchers.left(either.error)

/**
 * A non-functional match utility for the Either type
 * Use as: match({ either: right(41), matchers: { right: value => value + 1, left: err => throw err }})
 * @param { either, matchers } An object that takes the either value and a matchers object
 * @returns The result of the evaluated match tree
 */
export const match = <E extends Error, T, R1, R2>({
    either,
    matchers,
}: {
    either: Either<E, T>
    matchers: Matchers<E, T, R1, R2>
}) =>
    'value' in either
        ? matchers.right(either.value)
        : matchers.left(either.error)
