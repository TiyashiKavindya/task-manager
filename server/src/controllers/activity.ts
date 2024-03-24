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
    update: async (req: Request, res: Response) => {
        // try {
        //     const id = req.params.id
        //     const { name, description, status, tagId } = req.body
        //     const result = await db.query('UPDATE activity SET name = ?, description = ?, status = ?, tagId = ? WHERE id = ?', [name, description, status, tagId, id])
        //     if (result.success) {
        //         res.status(200).send('Activity updated')
        //     }
        // } catch (err) {
        //     res.status(404).send(err)
        // }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await Activity.delete(parseInt(id))
            if (result.success) {
                res.status(200).send('Activity deleted')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller
