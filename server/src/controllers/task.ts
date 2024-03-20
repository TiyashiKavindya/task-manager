import { Request, Response } from "express"
import db from "../db"

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            const result = await db.query('SELECT * FROM task')
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await db.query('SELECT * FROM task WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }

    },
    add: async (req: Request, res: Response) => {
        try {
            const { name, content, status_id, start_date, end_date } = req.body
            console.log(req.body);

            const result = await db.query('INSERT INTO task (name, content, status_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [name, content, parseInt(status_id), new Date(start_date), new Date(end_date)])
            if (result.success) {
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
            const { name, description, status, tagId } = req.body
            const result = await db.query('UPDATE task SET name = ?, description = ?, status = ?, tagId = ? WHERE id = ?', [name, description, status, tagId, id])
            if (result.success) {
                res.status(200).send('Task updated')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await db.query('DELETE FROM task WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send('Task deleted')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller