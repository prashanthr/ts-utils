// option.ts
export type Some<T> = { value: T }
export type None = Record<string, never>
export type Option<T> = Some<T> | None

export const some = <T>(value: T): Some<T> => ({ value })
export const none = (): None => ({})

export interface Matchers<T, R1, R2> {
    none(): R1
    some(value: T): R2
}

export const matchF =
    <T, R1, R2>(matchers: Matchers<T, R1, R2>) =>
    (option: Option<T>) =>
        'value' in option ? matchers.some(option.value) : matchers.none()

export const match = <T, R1, R2>({
    option,
    matchers,
}: {
    option: Option<T>
    matchers: Matchers<T, R1, R2>
}) => ('value' in option ? matchers.some(option.value) : matchers.none())
