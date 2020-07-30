import { getDb } from './mongodb-connect'
import { ObjectID } from 'mongodb'

export const findOneTodo = (params) => {
  return new Promise(function (resolve, reject) {
    getDb()
      .collection('Todo')
      .find({ _id: ObjectID(params._id) })
      .limit(1)
      .toArray(function (err, result) {
        err ? reject(err) : resolve(result[0])
      })
  })
}

export const findTodos = (Todos) => {
  return new Promise(function (resolve, reject) {
    getDb()
      .collection('Todo')
      .find(Todos)
      .limit(150)
      .toArray(function (err, result) {
        err ? reject(err) : resolve(result)
      })
  })
}

export const insertOneTodo = async (Todo) => {
  return new Promise(function (resolve, reject) {
    // @Note: this is a must to insert the first insertOneMet. (to upfacto) :)
    getDb()
      .collection('Todo')
      .insertOne(Todo, function (err, result) {
        err ? reject(err) : resolve(result.ops[0])
      })
  })
}

export const updateOneTodo = async (Todo) => {
  const { _id, status, detail, title } = Todo
  return new Promise(function (resolve, reject) {
    // @Note: this is a must to insert the first insertOneMet. (to upfacto) :)
    getDb()
      .collection('Todo')
      .updateOne(
        { _id: ObjectID(Todo._id) },
        { $set: { title: title, status: status, detail: detail } },
        function (err, result) {
          err ? reject(err) : resolve(Todo)
        }
      )
  })
}
