import { Request, Response } from "express"
import ActivityType from "../models/activityType"

const controller = {
    selectAll: async (req: Request, res: Response) => {
        try {
            const result = await ActivityType.selectAll()
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller
