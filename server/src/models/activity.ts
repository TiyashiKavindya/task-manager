import db from "../db"

const Activity = {
    selectAll: () => {
        return db.query(`
        SELECT 
        a.*, 
        at.name as activity_type, 
        s.title as status, s.style as status_style 
        FROM activity a 
        INNER JOIN activity_type at ON a.activity_type_id = at.id 
        INNER JOIN status s ON a.status_id = s.id`
        )
    },
    selectById: (id: number) => {
        return db.query('SELECT * FROM activity WHERE id = ?', [id])
    },
    create: (data: any[]) => {
        return db.query('INSERT INTO activity (title, description, url, start_date, end_date, status_id, activity_type_id) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
    },
    update: (id: number, data: any[]) => {
        return db.query('UPDATE activity SET name = ?, content = ?, start_date = ?, end_date = ? WHERE id = ?', [...data, id])
    },
    delete: async (id: number) => {
        return db.query('DELETE FROM activity WHERE id = ?', [id])
    },
    updateStatus: async (id: number, status: number | string) => {
        return db.query('UPDATE activity SET status_id = ? WHERE id = ?', [status, id])
    }
}

export default Activity