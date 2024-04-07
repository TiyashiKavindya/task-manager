import { Request, Response } from "express"
import Activity from "../models/activity"
import { nullableDate, nullableString } from "../utils"
import ActivityTag from "../models/ActivityTag"

const controller = {
    selectAll: async (req: Request, res: Response) => {
        try {
            const result = await Activity.selectAll()
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    selectAllNameAndIdOnly: async (req: Request, res: Response) => {
        try {
            const result = await Activity.selectAllNameAndIdOnly()
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    selectById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await Activity.selectById(parseInt(id))
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }

    },
    getThisMonthActivityByStatus: async (req: Request, res: Response) => {
        try {
            const result = await Activity.getThisMonthActivityByStatus()
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const { title, description, url, start_date, end_date, status_id, activity_type_id, tags } = req.body
            const result = await Activity.create([title, description, nullableString(url), nullableDate(start_date), nullableDate(end_date), status_id, activity_type_id])
            if (result.success) {
                tags.forEach(async (tag_id: number) => {
                    await ActivityTag.create([result.data.insertId, tag_id])
                })
                res.status(201).send(result)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    updateActivityStatus: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { status } = req.body
            const result = await Activity.updateActivityStatus(parseInt(id), status)
            if (result.success) {
                res.status(200).send(result)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { title, description, url, start_date, end_date, tags } = req.body
            const result = await Activity.update(parseInt(id), [title, description, nullableString(url), nullableDate(start_date), nullableDate(end_date)])
            if (result.success) {
                if (tags.length > 0) {
                    await ActivityTag.deleteByActivityId(parseInt(id))
                    const promises = tags.map(async (tag_id: number) => {
                        await ActivityTag.create([parseInt(id), tag_id])
                    })
                    await Promise.all(promises)
                }
                res.status(200).send(result)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await Activity.delete(parseInt(id))
            if (result.success) {
                res.status(200).send(result)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller
