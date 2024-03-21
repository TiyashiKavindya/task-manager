import { Request, Response } from 'express'
import db from '../db'
import Status from '../models/status'

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            const result = await Status.selectAll()
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
            const result = await db.query('SELECT * FROM status WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }

    },
    add: async (req: Request, res: Response) => {
        try {
            const { title, style } = req.body
            const result = await db.query('INSERT INTO status (title, style) VALUES (?, ?)', [title, style])
            if (result.success) {
                res.status(201).send('status added')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { name, color } = req.body
            const result = await db.query('UPDATE status SET name = ?, color = ? WHERE id = ?', [name, color, id])
            if (result.success) {
                res.status(200).send('status updated')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await db.query('DELETE FROM status WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send('status deleted')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller