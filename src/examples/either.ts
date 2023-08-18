import { Either, right, left, matchEither, matchEitherF } from '../lib/index'

// Demo
const rightFn = (): Either<Error, number> => {
    let value: number = 1
    return right(value)
  }
  
  const errFn = (): Either<Error, number> => {
    let error: Error = new Error('i am an error')
    return left(error)
  }
  
  const operate = () => {
    // const defaultMatchHandler: Matchers<any, Error, any, Error> = {
    //   ok: (r: any) => r,
    //   err: (e: Error) => e
    // }
    let eitherRight = matchEitherF({
      right: r => r,
      left: e => e
    })(rightFn())
    let eitherLeft = matchEitherF({
      right: r => r,
      left: e => e
    })(errFn())
    let eitherRight2 = matchEither({ either: rightFn(), matchers: { right: r => r, left: e => e }})
    console.log(`Result of okFn from matchF is ${eitherRight} and match is ${eitherRight2}`)
    console.log(`Result of errFn is ${eitherLeft}`)
  }
  
  operate()