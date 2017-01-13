export const generate = func => (...rest) => func.apply(this, rest)
