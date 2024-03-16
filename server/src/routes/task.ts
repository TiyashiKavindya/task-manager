import express from 'express'
import controller from '../controllers/task'

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.add)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router