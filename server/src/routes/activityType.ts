import express from 'express'
import controller from '../controllers/activityType'

const router = express.Router()

router.get('/', controller.selectAll)

export default router