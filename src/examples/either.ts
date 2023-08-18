import { Either, right, left, matchEither, matchEitherF } from "../lib/index";

// Demo
const rightFn = (): Either<Error, number> => {
  const value: number = 1;
  return right(value);
};

const errFn = (): Either<Error, number> => {
  const error: Error = new Error("i am an error");
  return left(error);
};

const operate = () => {
  // const defaultMatchHandler: Matchers<any, Error, any, Error> = {
  //   ok: (r: any) => r,
  //   err: (e: Error) => e
  // }
  const eitherRight = matchEitherF({
    right: (r) => r,
    left: (e) => e,
  })(rightFn());
  const eitherLeft = matchEitherF({
    right: (r) => r,
    left: (e) => e,
  })(errFn());
  const eitherRight2 = matchEither({
    either: rightFn(),
    matchers: { right: (r) => r, left: (e) => e },
  });
  console.log(
    `Result of okFn from matchF is ${eitherRight} and match is ${eitherRight2}`,
  );
  console.log(`Result of errFn is ${eitherLeft}`);
};

operate();
