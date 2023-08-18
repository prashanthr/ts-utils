/* Core Utility Types */
export type Ok<T> = { value: T };
export type Err<E> = { error: E };
export type Result<T, E = Error> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ value });
export const err = <E>(error: E): Err<E> => ({ error });

export interface Matchers<T, E extends Error, R1, R2> {
  ok(value: T): R1;
  err(error: E): R2;
}

export const matchF =
  <T, E extends Error, R1, R2>(matchers: Matchers<T, E, R1, R2>) =>
  (result: Result<T, E>) =>
    "value" in result ? matchers.ok(result.value) : matchers.err(result.error);

export const match = <T, E extends Error, R1, R2>({
  result,
  matchers,
}: {
  result: Result<T, E>;
  matchers: Matchers<T, E, R1, R2>;
}) =>
  "value" in result ? matchers.ok(result.value) : matchers.err(result.error);
