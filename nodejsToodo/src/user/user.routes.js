import { Router } from 'express'
import UserController from './user.controller.js'
const routes = Router()
/**
 * @swagger
 *
 * /create:
 *   post:
 *     description: Creating a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lastname
 *         description: lastname
 *         in: formData
 *         required: true
 *         type: string
 *       - name: firstname
 *         description: lastname
 *         in: formData
 *         required: true
 *         type: string
 *      - name: email
 *         description: email
 *         in: formData
 *         required: true
 *         type: string
 *      - birthdate: email
 *         description: email
 *         in: formData
 *         required: false
 *         type: Date (ISO8601)
 *     responses:
 *       200:
 *         description: login
 */
routes.post('/create/', async (req, res) => {
  let error
  await UserController.create(req.body).catch((err) => {
    error = err
    res.status(500)
    res.send(err)
  })
  if (!error) {
    const itemInDB = await UserController.show({
      param: req.body.id,
    }).catch((err) => {
      res.status(500)
      res.send(err)
    })
    res.status(200)
    res.send(itemInDB)
  }
  /*
  let error
  const item = await UserController.create(req.body).then(
    (success) => {},
    (err) => {
      console.log(err)
      error = err
      res.status(500)
      res.send(err)
    }
  )
  if (!error) {
    const itemInDB = await UserController.show({
      param: item.insertId,
    }).catch((err) => {
      res.status(500)
      res.send(err)
    })
    res.send(itemInDB)
  }
*/
})

routes.put('/update', async (req, res) => {
  let error
  await UserController.update(req.body).catch((err) => {
    error = err
    res.status(500)
    res.send(err)
  })
  if (!error) {
    const itemInDB = await UserController.show({
      param: req.body.id,
    }).catch((err) => {
      res.status(500)
      res.send(err)
    })
    res.status(200)
    res.send(itemInDB)
  }
})

routes.delete('/remove/:id', async (req, res) => {
  await UserController.remove(req.params).then(
    (result) => {
      res.status(200)
      res.send(result)
    },
    (err) => {
      res.status(500)
      res.send(err)
    }
  )
})

routes.get('/list', async (req, res) => {
  const item = await UserController.list().catch((err) => {
    res.status(500)
    res.send(err)
  })
  res.send({ status: 'success', result: item })
})

/*
routes.get("/listAll", async (req, res) => {
  const item = await UserController.listall().catch(err => {
    res.status(500);
    res.send(err);
  });
  res.send({status: 'success', result: item});
});
*/
routes.get('/show/:param', async (req, res) => {
  const item = await UserController.show(req.params).catch((err) => {
    res.status(500)
    res.send(err)
    console.log(err)
  })
  res.send(item)
})

module.exports = routes
