import { Request, Response } from "express"
import Task from "../models/task"
import TaskTag from "../models/TaskTag"
import Tag from "../models/tag"
import Status from "../models/status"

const controller = {
    selectAll: async (req: Request, res: Response) => {
        try {
            const result = await Task.selectAll()
            if (result.success) {
                res.status(200).send(result.data);
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    selectById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await Task.selectById(parseInt(id))
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }

    },
    create: async (req: Request, res: Response) => {
        try {
            const { name, content, status_id, start_date, end_date, tags } = req.body
            const result = await Task.create([name, content, parseInt(status_id), new Date(start_date), new Date(end_date)])
            if (result.success) {
                // tags.forEach(async (tag_id: number) => {
                //     await TaskTag.create([result.data.insertId, tag_id])
                // })

                const promises = tags.map(async (tag_id: number) => {
                    await TaskTag.create([result.data.insertId, tag_id])
                })

                const d = Promise.all(promises)

                res.status(201).send(result)
            }
        } catch (err) {
            console.log(err);
            res.status(404).send(err)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { name, content, start_date, end_date, tags } = req.body
            const result = await Task.update(parseInt(id), [name, content, new Date(start_date), new Date(end_date)])
            if (result.success) {
                const deleteOld = await TaskTag.deleteByTaskId(parseInt(id))
                console.log(res);
                if (deleteOld.success) {
                    tags.forEach(async (tag_id: number) => {
                        await TaskTag.create([parseInt(id), tag_id])
                    })
                    res.status(200).send(result)
                } else {
                    res.status(404).send({ success: false, message: 'Failed to update tags' })
                }
            } else {
                res.status(404).send({ success: false, message: 'Failed to update task' })
            }

        } catch (err) {
            res.status(404).send(err)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await Task.delete(parseInt(id))
            if (result.success) {
                res.status(200).send('Task deleted')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    updateStatus: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const status = req.body.status
            const result = await Task.updateStatus(parseInt(id), parseInt(status))
            if (result.success) {
                res.status(200).send(result)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller