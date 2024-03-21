import db from "../db"

const Task = {
    selectAll: () => {
        return db.query('SELECT * FROM task')
    },
    selectById: (id: number) => {
        return db.query('SELECT * FROM task WHERE id = ?', [id])
    },
    create: (data: any[]) => {
        return db.query('INSERT INTO task (name, content, status_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)', data)
    },
    update: (id: number, data: any[]) => {
        return db.query('UPDATE task SET name = ?, content = ?, status_id = ?, start_date = ?, end_date = ? WHERE id = ?', [...data, id])
    },
    delete: (id: number) => {
        return db.query('DELETE FROM task WHERE id = ?', [id])
    }
}

export default Task