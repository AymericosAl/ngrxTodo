import { MongoClient } from 'mongodb'
import { equal } from 'assert'

var _db

export const MongoDBConnect = async function () {
  await MongoClient.connect(
    'mongodb://' +
      process.env.MONGO_ADMIN +
      ':' +
      process.env.MONGO_PASS +
      '@' +
      process.env.MONGO_ENDPOINT +
      ':' +
      process.env.MONGO_PORT +
      '/avalancheMongodb?authSource=admin',
    { useNewUrlParser: true },
    (err, client) => {
      equal(null, err)
      console.log(err)
      console.log('connected')
      _db = client.db('avalancheMongodb')
    }
  )
  return _db
}

export const getDb = function () {
  return _db
}
