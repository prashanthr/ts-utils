# ts-utils

A typescript utility library to help utilize functional programming concepts by re-creating monads like Option (Scala), Either (Scala) and Result (Rust) in Typescript.

# Installation

[NPM package](https://www.npmjs.com/package/@universal-apps/ts-utils)

```
npm i @universal-apps/ts-utils
# OR
pnpm i @universal-apps/ts-utils
```

## Library

[Option types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/option.ts)

[Either types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/either.ts)

[Result types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/result.ts)

[Result tuple types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/result-tuple.ts)

## Usage & Examples

```typescript
// Option
const someValue: Option<number> = some(42) // { value: 42 }
const noValue: Option<number> = none() // {}

// Utilities to match on the Option type
matchOptionF({
    some: (value) => value,
    none: () => undefined,
})(someValue)

// Either
const rightFn = (): Either<Error, number> => right(42) // { value: 42 }
const leftFn = (): Either<Error, number> => left(new Error('bad')) // { error: Error('bad) }

// Utilities to match on the Either type
matchEitherF<Error, number, Error, number>({
    right: (result) => result,
    left: (err) => err,
})(rightFn)

// Result
const okFn = (): Result<number, Error> => ok(42) // { value: 42 }
const errFn = (): Result<number, Error> => err(new Error('bad')) // { error: Error('bad') }

// Utilities to match on the Result type
matchResultF({
    ok: (result) => result,
    err: (err) => err,
})(okFn())
// OR
matchResultF<number, Error, number, Error>({
    ok: (result) => result,
    err: (err) => err,
})(okFn())

// Result Tuple
const result: ResultT<number> = 1 // 1
const error: ErrorT = new Error('bad') // Error('bad')

const resultTuple: ResultTuple<number> = toTuple({ result }) // [1, undefined]
// OR
const resultTuple: ResultTuple<number> = toTuple({ error }) // [undefined, new Error('bad')]

// Say goodbye to try/catch and use it this way
const aPromise = async (): Promise<ResultTuple<number>> =>
    Promise.resolve(toTuple({ result: 1 }))

const fn = async (): Promise<any> => {
    const [result, error] = await aPromise()
    if (error) {
        // do something with error
        throw error
    } else {
        // do something with result
        console.log(`Result is ${result}`)
    }
}
```

More examples can be found [here](https://github.com/prashanthr/ts-utils/tree/main/src/examples/)

## Tests

The tests can be found [here](https://github.com/prashanthr/ts-utils/tree/main/src/test/)

```
pnpm run test
# or
pnpm run test:ui
```

## Inspiration

Inspired by [this article](https://imhoff.blog/posts/using-results-in-typescript) by Dan Imhoff.

## Resources

[fp-ts](https://github.com/gcanti/fp-ts) library

[EffectTS](https://github.com/Effect-TS/effect) library

[pratica](https://github.com/rametta/pratica)

[Functional Programming Series](https://www.youtube.com/playlist?list=PLuPevXgCPUIMbCxBEnc1dNwboH6e2ImQo) on Youtube

## Publishing

```
pnpm version <major|minor|patch>
pnpm publish --dry-run --publish-branch <current-branch>
pnpm publish
```
