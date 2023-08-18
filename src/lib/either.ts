/* Core Utility Types */
export type Right<T> = { value: T };
export type Left<E> = { error: E };
export type Either<E, T> = Right<T> | Left<E>;

export const right = <T>(value: T): Right<T> => ({ value });
export const left = <E>(error: E): Left<E> => ({ error });

export interface Matchers<E extends Error, T, R1, R2> {
  left(error: E): R1;
  right(value: T): R2;
}

export const matchF =
  <E extends Error, T, R1, R2>(matchers: Matchers<E, T, R1, R2>) =>
  (either: Either<E, T>) =>
    "value" in either
      ? matchers.right(either.value)
      : matchers.left(either.error);

export const match = <E extends Error, T, R1, R2>({
  either,
  matchers,
}: {
  either: Either<E, T>;
  matchers: Matchers<E, T, R1, R2>;
}) =>
  "value" in either
    ? matchers.right(either.value)
    : matchers.left(either.error);
