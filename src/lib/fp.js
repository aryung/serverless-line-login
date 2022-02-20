const I = x => x
const Box = x =>
  ({
    chain: f => f(x),
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
  })

const Right = x =>
  ({
    chain : f => f(x),
    ap : other => other.map(x),
    traverse : (of, f) => f(x).map(Right),
    map : f => Right(f(x)),
    fold : (f, g) => g(x),
    inspect : () => `Right(${x})`
  })

const Left = x =>
  ({
    chain : f => Left(x),
    ap : other => Left(x),
    traverse : (of, f) => of(Left(x)),
    map : f => Left(x),
    fold : (f, g) => f(x),
    inspect : () => `Left(${x})`
  })

const fromNullable = x =>
  (x != null || x == undefined || x.length !== 0) ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

module.exports = {
  I,
  Box,
  Right,
  Left,
  fromNullable,
  tryCatch,
  of : Right
}
