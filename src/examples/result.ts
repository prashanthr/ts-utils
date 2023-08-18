import { Result, ok, err, matchResult, matchResultF } from "../lib/index";

// Demo
const okFn = (): Result<number> => {
  const value: number = 1;
  return ok(value);
};

const errFn = (): Result<number> => {
  const error: Error = new Error("i am an error");
  return err(error);
};

const operate = () => {
  // const defaultMatchHandler: Matchers<any, Error, any, Error> = {
  //   ok: (r: any) => r,
  //   err: (e: Error) => e
  // }
  const resultOk = matchResultF({
    ok: (r) => r,
    err: (e) => e,
  })(okFn());
  const resultErr = matchResultF({
    ok: (r) => r,
    err: (e) => e,
  })(errFn());
  const resultOk2 = matchResult({
    result: okFn(),
    matchers: { ok: (r) => r, err: (e) => e },
  });
  console.log(
    `Result of okFn from matchF is ${resultOk} and match is ${resultOk2}`,
  );
  console.log(`Result of errFn is ${resultErr}`);
};

operate();
