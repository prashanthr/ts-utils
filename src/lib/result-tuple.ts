export type EmptyResult = null | undefined
export type MaybeResult<T, I = EmptyResult> = T | I
export type MaybeError<E = Error, I = EmptyResult> = E | I
export type ResultTuple<T, E = Error, I = EmptyResult> = [
    MaybeResult<T, I>,
    MaybeError<E, I>,
]

export type TupleArgs<T, E = Error> = {
    result?: MaybeResult<T>
    error?: MaybeError<E>
}

/**
 * Utility fn that returns a 2 element tuple with
 * the result as the first element and
 * the error as the second element.
 * No validation is done and you get what you pass in
 * @param args { result?: T, error?: E = Error }. Note: Both arguments are optional
 * @returns TupleResult i.e. [T, E]
 */
export const toTuple = <T, E = Error>(
    args: TupleArgs<T, E>,
    strict: boolean = false,
): ResultTuple<T, E> => [args.result, args.error]
