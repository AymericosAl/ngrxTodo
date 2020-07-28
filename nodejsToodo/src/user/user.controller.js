import { connection } from '../mysql.utils.js'
import { isUserCorrect } from './user.model.js'
import { CustomError, InvalidDataError } from '../error'
/**
 * Concerning User Controller (cf: user.model.js)
 */

/**
 * Creating a user.
 * @Params:
 *    username: string(50) required
 *    email: string(250) required
 *    return User
 */
const create = ({ username, email, birthdate }) => {
  return new Promise(function (resolve, reject) {
    const dataCheck = isUserCorrect(username, email, birthdate)
    if (dataCheck !== true) {
      reject(
        new InvalidDataError(
          { status: 400, machin: 'node', dataCheck: dataCheck },
          'invalid data'
        )
      )
    } else {
      // Verify Data to be implemented
      // Find item
      const query = 'INSERT INTO user_mnhn SET ?'
      const data = { username: username, email: email }
      if (birthdate) {
        data.birthdate = birthdate
      }
      connection.query(query, data, function (err, result) {
        if (err) {
          reject(
            new CustomError({ machine: 'mysql', status: 500 }, err.sqlMessage)
          )
        } else {
          resolve(result)
        }
      })
    }
  })
}

/**
 * Updating a user data.
 * @Params:
 *     id: int(11) required
 *     username: string(50) optional
 *     email: string(250) optional
 * return User
 */
const update = ({ id, username, email, birthdate }) => {
  return new Promise(function (resolve, reject) {
    const dataCheck = isUserCorrect(username, email, birthdate)
    if (dataCheck !== true) {
      reject(
        new InvalidDataError(
          { status: 400, machin: 'node', dataCheck: dataCheck },
          'invalid data'
        )
      )
    }
    const query =
      'UPDATE user_mnhn SET username = ?, email = ?' +
      (birthdate ? ', birthdate = ?' : '') +
      ' WHERE id = ?'
    const data = birthdate
      ? [username, email, birthdate, id]
      : [username, email, id]
    connection.query(query, data, function (err, result) {
      if (result.affectedRows === 1) {
        resolve({
          machin: 'mysql',
          status: 204,
          message: 'user updated:' + ' affectedRows = ' + result.affectedRows,
        })
      } else if (result.affectedRows > 1) {
        // big issue to log
        reject(
          new CustomError({ machin: 'mysql', status: 500 }, 'many user updated')
        )
      } else {
        if (err) {
          reject(
            new CustomError({ machin: 'mysql', status: 500 }, result.sqlMessage)
          )
        } else if (result.affectedRows === 0) {
          reject(
            new CustomError({ machin: 'mysql', status: 500 }, 'user not found')
          )
        } else {
          // @ToLog
          throw new CustomError(
            { machin: 'mysql', status: 500 },
            'unexpected error @ToLog'
          )
        }
      }
    })
  })
}

/**
 * Function to remove a user.
 * @Params:
 *     id: int(11) required
 * return boolean
 */
const remove = ({ id }) => {
  return new Promise(function (resolve, reject) {
    connection.query('DELETE FROM user_mnhn WHERE id = ?', [id], function (
      err,
      result
    ) {
      if (result.affectedRows === 1) {
        resolve({
          machin: 'mysql',
          status: 204,
          message: 'user removed:' + ' affectedRows = ' + result.affectedRows,
        })
      } else if (result.affectedRows > 1) {
        // big issue to log
        reject(
          new CustomError({ machin: 'mysql', status: 500 }, 'many user removed')
        )
      } else {
        if (err) {
          reject(
            new CustomError({ machin: 'mysql', status: 500 }, result.sqlMessage)
          )
        } else if (result.affectedRows === 0) {
          reject(
            new CustomError({ machin: 'mysql', status: 500 }, 'user not found')
          )
        } else {
          // @ToLog
          throw new CustomError(
            { machin: 'mysql', status: 500 },
            'unexpected error @ToLog'
          )
        }
      }
    })
  })
}

/**
 * listing all users.
 * return array of Users
 */
const list = async () => {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM user_mnhn', function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

/**
 * listing all users.
 * return array of Users
 */
const listAll = async (userArray) => {
  const promises = userArray.map(
    (user) =>
      new Promise(function (resolve, reject) {
        connection.query(
          'SELECT * FROM user_mnhn WHERE username = ?',
          [user],
          function (err, result) {
            // console.log(result)
            if (err) reject(err)
            resolve(result[0])
          }
        )
      })
  )
  return Promise.all(promises)
}

/**
 * Retrieving a user.
 * @Params:
 *    id: int(11) required
 * return User
 */
const show = ({ param }) => {
  return new Promise(function (resolve, reject) {
    connection.query(
      'SELECT * FROM user_mnhn WHERE id = ? OR username = ?',
      [param, param],
      function (err, result) {
        if (result[0]) {
          resolve(result[0])
        } else {
          if (err) {
            reject(
              new CustomError({ machin: 'mysql', status: 500 }, err.sqlMessage)
            )
          } else if (!result.length) {
            reject(
              new CustomError(
                { machin: 'mysql', status: 404 },
                'user not found'
              )
            )
          } else {
            reject(
              new CustomError({ machin: 'mysql', status: 500 }, 'unknown issue')
            )
          }
        }
      }
    )
  })
}

exports.create = create
exports.update = update
exports.remove = remove
exports.list = list
exports.listAll = listAll
exports.show = show
