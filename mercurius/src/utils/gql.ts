export const gql = (literal: string | readonly string[]): string =>
  Array.isArray(literal) ? literal[0] : literal
