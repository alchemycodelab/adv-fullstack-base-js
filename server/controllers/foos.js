import { Router } from 'express'
import db from '../database.js'


export default Router()
  .get('/', (req, res, next) => {
    return db.query('select * from foos;')
      .then((result) => res.send(result.rows))
      .catch(next)
  })
  .put('/:id', (req, res, next) => {
    if(req.params.id != null && Number.isInteger(parseInt(req.params.id))) {
      console.log(req.body)
      return db.query('update foos set foo = $1 where foos.id = $2;', [req.body.foo, req.params.id])
        .then(() => res.sendStatus(201))
        .catch(next)
    } else {
      console.error(
        `id to delete is not a valid id: ${JSON.stringify(req.params.id)}`,
      )
      res.status(400)
    }
  })
  .delete('/:id', (req, res, next) => {
    if(req.params.id != null && Number.isInteger(parseInt(req.params.id))) {
      return db.query('delete from foos where foos.id = $1;', [req.params.id])
        .then(() => res.sendStatus(201))
        .catch(next)
    } else {
      console.error(
        `id to delete is not a valid id: ${JSON.stringify(req.params.id)}`,
      )
      res.status(400)
    }
  })
