import db from "../db"

const Activity = {
    selectAll: () => {
        return db.query(`
        SELECT 
        a.id, a.title, a.start_date, a.end_date,
        at.name as activity_type, 
        s.title as status_title, s.style as status_style
        FROM activity a 
        INNER JOIN activity_type at ON a.activity_type_id = at.id 
        INNER JOIN status s ON a.status_id = s.id
        `)
    },

    selectById: (id: number) => {
        return db.query(`
        SELECT 
        a.*, 
        at.name as activity_type, 
        s.title as status_title, s.style as status_style,
        JSON_ARRAYAGG(CAST(atag.tag_id AS UNSIGNED)) AS tags
        FROM activity a 
        INNER JOIN activity_type at ON a.activity_type_id = at.id 
        INNER JOIN status s ON a.status_id = s.id
        LEFT JOIN activity_tag atag ON a.id = atag.activity_id WHERE a.id = ? GROUP BY a.id
        `, [id])
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