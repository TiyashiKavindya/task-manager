import express from 'express'
import controller from '../controllers/activity'

const router = express.Router()

router.get('/', controller.selectAll)
router.get('/name_and_id_only', controller.selectAllNameAndIdOnly)
router.get('/:id', controller.selectById)
router.post('/', controller.create)
router.patch('/update_status/:id', controller.updateActivityStatus)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router