import GraphQLJSON from 'graphql-type-json'
import { GraphQLScalarType } from 'graphql'

export const scalar = {
  JSON: GraphQLJSON,
  GEO: new GraphQLScalarType({
    name: 'Geo',
    description: 'Set of X, and Y as well as exact address name',
    parseValue(value) {
      return value
    },
    serialize(value) {
      return value
    },
    parseLiteral(ast) {
      return ast.value
    },
  }),
}
