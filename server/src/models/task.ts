import db from "../db"

const Task = {
    selectAll: () => {
        return db.query(`SELECT * from task`)
    },
    selectById: (id: number) => {
        return db.query('SELECT * FROM task WHERE id = ?', [id])
    },
    create: (data: any[]) => {
        return db.query('INSERT INTO task (name, content, status_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)', data)
    },
    update: (id: number, data: any[]) => {
        return db.query('UPDATE task SET name = ?, content = ?, start_date = ?, end_date = ? WHERE id = ?', [...data, id])
    },
    delete: async (id: number) => {
        return db.query('DELETE FROM task WHERE id = ?', [id])
    },
    updateStatus: async (id: number, status: number | string) => {
        return db.query('UPDATE task SET status_id = ? WHERE id = ?', [status, id])
    }
}

export default Task