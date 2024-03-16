import { Request, Response } from "express"
import db from "../db"

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            const result = await db.query('SELECT * FROM activity')
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
            const result = await db.query('SELECT * FROM activity WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }

    },
    add: async (req: Request, res: Response) => {
        try {
            const { name, description, status, tagId } = req.body
            const result = await db.query('INSERT INTO activity (name, description, status, tagId) VALUES (?, ?, ?, ?)', [name, description, status, tagId])
            if (result.success) {
                res.status(201).send('Activity added')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { name, description, status, tagId } = req.body
            const result = await db.query('UPDATE activity SET name = ?, description = ?, status = ?, tagId = ? WHERE id = ?', [name, description, status, tagId, id])
            if (result.success) {
                res.status(200).send('Activity updated')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await db.query('DELETE FROM activity WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send('Activity deleted')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller
