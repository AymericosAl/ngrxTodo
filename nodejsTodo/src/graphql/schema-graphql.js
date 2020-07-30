// Chat + Dauphin = Esquimos
const { gql } = require('apollo-server')

export const typeDefs = gql`
  scalar GEO
  scalar JSON

  type Meta {
    count: Int
  }

  type User {
    _id: ID!
    username: String
    mail: String
    geo: GEO
    avatar_url: String
    credential: Credential
  }

  type Credential {
    _id: ID!
    pwd: String
    provider: String
    idFromProvider: String
    token: String
  }

  type Todo {
    _id: ID!
    title: String
    detail: String
    date: Int
    position: Int
    limit: Int
    status: String
  }

  enum STATUS {
    DRAFT
    SAVE
    DOING
    CHECK
    REMOVE
  }

  type Mutation {
    CreateTodo(todo: TodoInput): Todo
    UpdateTodo(todo: TodoInput): Todo
  }

  input AuthorInput {
    username: String
  }

  input TodoInput {
    _id: ID
    title: String
    detail: String
    date: Int
    position: Int
    limit: Int
    status: String
  }

  type Query {
    todo(_id: ID!): Todo
    findTodos(username: String): [Todo]
  }
`
