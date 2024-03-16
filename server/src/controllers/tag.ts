import { Request, Response } from 'express'
import db from '../db'

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            const result = await db.query('SELECT * FROM tag')
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
            const result = await db.query('SELECT * FROM tag WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send(result.data)
            }
        } catch (err) {
            res.status(404).send(err)
        }

    },
    add: async (req: Request, res: Response) => {
        try {
            const { name, color } = req.body
            const result = await db.query('INSERT INTO tag (name) VALUES (?, color)', [name, color])
            if (result.success) {
                res.status(201).send('Tag added')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { name, color } = req.body
            const result = await db.query('UPDATE tag SET name = ?, color = ? WHERE id = ?', [name, color, id])
            if (result.success) {
                res.status(200).send('Tag updated')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const result = await db.query('DELETE FROM tag WHERE id = ?', [id])
            if (result.success) {
                res.status(200).send('Tag deleted')
            }
        } catch (err) {
            res.status(404).send(err)
        }
    }
}

export default controller