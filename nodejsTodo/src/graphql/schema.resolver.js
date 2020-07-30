import {
  findOneTodo,
  findTodos,
  insertOneTodo,
  updateOneTodo,
} from '../datasources/Todo.resolver'

// Todo
export const queryTodo = {
  todo: async (object, params, ctx, resolveInfo) => {
    let Todo = await findOneTodo(params)
    // If try did not succeed, creating a new Todo
    if (!Todo && params.user) {
      return await insertOneTodo(params)
    }
    return Todo
  },

  findTodos: async (object, params, ctx, resolveInfo) => {
    return await findTodos({ username: 'Johnny' })
  },
}

export const mutationTodo = {
  CreateTodo: async (object, params, ctx, resolveInfo) => {
    const { todo } = params
    console.log('wow', params)
    todo.username = 'Johnny'
    return await insertOneTodo(todo)
  },
  UpdateTodo: async (object, params, ctx, resolveInfo) => {
    const { todo } = params
    todo.username = 'Johnny'
    return await updateOneTodo(todo)
  },
}
