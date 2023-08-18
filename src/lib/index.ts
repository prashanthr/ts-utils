// Result
export type { Result, Ok, Err, Matchers as ResultMatchers } from "./result";
export {
  ok,
  err,
  match as matchResult,
  matchF as matchResultF,
} from "./result";

// Either
export type { Either, Right, Left, Matchers as EitherMatchers } from "./either";
export {
  right,
  left,
  match as matchEither,
  matchF as matchEitherF,
} from "./either";
