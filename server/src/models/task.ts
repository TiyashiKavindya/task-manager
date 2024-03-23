import db from "../db"

const Task = {
    selectAll: () => {
        return db.query(`
        SELECT 
        t.*, 
        s.title AS status_title, s.style AS status_style,
        JSON_ARRAYAGG(CAST(tt.tag_id AS UNSIGNED)) AS tags
        FROM task t
        INNER JOIN status s ON t.status_id = s.id
        INNER JOIN task_tag tt ON t.id = tt.task_id GROUP BY t.id
        `)
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