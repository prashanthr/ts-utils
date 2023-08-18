import { Result, ok, err, matchResult, matchResultF } from '../lib/index'

// Demo
const okFn = (): Result<number> => {
    let value: number = 1
    return ok(value)
  }
  
  const errFn = (): Result<number> => {
    let error: Error = new Error('i am an error')
    return err(error)
  }
  
  const operate = () => {
    // const defaultMatchHandler: Matchers<any, Error, any, Error> = {
    //   ok: (r: any) => r,
    //   err: (e: Error) => e
    // }
    let resultOk = matchResultF({
      ok: r => r,
      err: e => e
    })(okFn())
    let resultErr = matchResultF({
      ok: r => r,
      err: e => e
    })(errFn())
    let resultOk2 = matchResult({ result: okFn(), matchers: { ok: r => r, err: e => e }})
    console.log(`Result of okFn from matchF is ${resultOk} and match is ${resultOk2}`)
    console.log(`Result of errFn is ${resultErr}`)
  }
  
  operate()