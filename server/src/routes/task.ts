import express from 'express'
import controller from '../controllers/task'

const router = express.Router()

router.get('/', controller.selectAll)
router.get('/today', controller.selectToday)
router.get('/thisWeekTaskCount', controller.thisWeekTaskCount)
router.get('/taskCountPreDay', controller.taskCountPreDay)
router.get('/thisMonthActivityStats', controller.getThisMonthActivityStats)
router.get('/thisMonthTaskStats', controller.getThisMonthTaskStats)
router.get('/:id', controller.selectById)
router.get('/activity/:id', controller.selectByActivity)
router.post('/', controller.create)
router.patch('/update_status/:id', controller.updateStatus)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router