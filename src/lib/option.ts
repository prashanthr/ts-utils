// option.ts

/**
 * The Option.Some type. The value can be of any type T
 */
export type Some<T> = { value: T }

/**
 * The Option.None type. The value is an empty object {}
 */
export type None = Record<string, never>

/**
 * The Option type.
 * It is a union of the Option.Some<T> and Option.None types.
 */
export type Option<T> = Some<T> | None

/**
 * A wrapper utility for the Option.Some type
 * @param value Any value of type T
 * @returns Some<T>
 */
export const some = <T>(value: T): Some<T> => ({ value })

/**
 * A wrapper utility for the Option.None type
 * @returns None i.e. ({})
 */
export const none = (): None => ({})

/**
 * The Matcher interface for the Option type with some and none trees.
 */
export interface Matchers<T, R1, R2> {
    none(): R1
    some(value: T): R2
}

/**
 * A functional match utility for the Option type
 * Use as: matchF({ some: value => value + 1, none: () => {} })(some(41))
 * @param matchers Matchers object for Option type
 * @returns The result of the evaluated match tree
 */
export const matchF =
    <T, R1, R2>(matchers: Matchers<T, R1, R2>) =>
    (option: Option<T>) =>
        'value' in option ? matchers.some(option.value) : matchers.none()

/**
 * A non-functional match utility for the Option type
 * Use as: match({ option: some(41), matchers: { some: value => value + 1, none: () => {} }})
 * @param { either, matchers } An object that takes the option value and a matchers object
 * @returns The result of the evaluated match tree
 */
export const match = <T, R1, R2>({
    option,
    matchers,
}: {
    option: Option<T>
    matchers: Matchers<T, R1, R2>
}) => ('value' in option ? matchers.some(option.value) : matchers.none())
