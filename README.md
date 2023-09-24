# ts-utils
A typescript utility library to help utilize functional programming concepts by re-creating monads like Option (Scala), Either (Scala) and Result (Rust) in Typescript.

# Installation

```
npm i @universal-apps/ts-utils
```

## Library

[Option types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/option.ts)

[Either types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/either.ts)

[Result types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/result.ts)

[Result tuple types](https://github.com/prashanthr/ts-utils/tree/main/src/lib/result-tuple.ts)

## Usage & Examples

```typescript
// Option
const someValue: Option<number> = some(1) // { value: 1 }
const noValue: Option<number> = none() // {}

// Either
const rightFn = (): Either<Error, number> => right(1) // { value: 1 }
const leftFn = (): Either<Error, number> => left(new Error('bad')) // { error: Error('bad) }

// Result
const okFn = (): Result<number, Error> => ok(1)
const errFn = (): Result<number, Error> => err(new Error('bad'))

// Result Tuple
const result: MaybeResult<number> = 1
const error: MaybeError = new Error('bad')
const resultTuple: ResultTuple<number> = toTuple({ result })
// OR
const resultTuple: ResultTuple<number> = toTuple({ error })

// Say goodbye to try/catch and use it this way
const aPromise = async (): Promise<ResultTuple<number>> =>
    Promise.resolve(toTuple({ result: 1 }))

const fn7 = async (): Promise<any> => {
    const [result, error] = await aPromise()
    if (error) {
        // do something with error
    } else {
        // do something with result
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
pnpm publish --dry-run --publish-branch <current-branch>
pnpm publish
```
