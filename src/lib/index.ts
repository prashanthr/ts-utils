// index.ts

// Option
export type { Option, Some, None, Matchers as OptionMatchers } from './option'
export {
    some,
    none,
    match as matchOption,
    matchF as matchOptionF,
} from './option'

// Result
export type { Result, Ok, Err, Matchers as ResultMatchers } from './result'
export { ok, err, match as matchResult, matchF as matchResultF } from './result'

// Either
export type { Either, Right, Left, Matchers as EitherMatchers } from './either'
export {
    right,
    left,
    match as matchEither,
    matchF as matchEitherF,
} from './either'

// Result Tuple
export type {
    EmptyResult,
    MaybeResult,
    MaybeError,
    ResultTuple,
    TupleArgs,
} from './result-tuple'
export { toTuple } from './result-tuple'
