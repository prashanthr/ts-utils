export type Result<T> = T
export type Err<E = Error> = E
export type ResultTuple<T, E = Error> =
    | [Result<T>, undefined]
    | [undefined, Err<E>]

export type TupleArgs<T, E = Error> = {
    result?: Result<T>
    error?: Err<E>
}

/**
 * Utility fn that returns a 2 element tuple with
 * the result as the first element and
 * the error as the second element.
 * No validation is done and you get what you pass in
 * @param args { result?: T, error?: E = Error }. Note: Both arguments are optional
 * @returns TupleResult i.e. [T, E] | EmptyTupleResult
 */
export const toTuple = <T, E = Error>(
    args: TupleArgs<T, E>,
): ResultTuple<T, E> => {
    if (args.error) {
        return [undefined, args.error]
    }
    if (args.result) {
        return [args.result, undefined]
    }
    throw new Error(
        'Error: At least one of error or result must be passed in to toTuple',
    )
}
