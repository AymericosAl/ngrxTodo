import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './schema-graphql.js'
import { scalar } from './specifictypes/scalar'
import { queryTodo, mutationTodo } from './schema.resolver'

const executableSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: {
    ...scalar,
    Mutation: { ...mutationTodo },
    Query: { ...queryTodo },
  },
})

export default executableSchema
