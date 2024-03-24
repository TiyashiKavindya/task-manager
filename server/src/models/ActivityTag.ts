import db from "../db"

const ActivityTag = {
    create: (data: any[]) => {
        return db.query('INSERT INTO activity_tag (activity_id, tag_id) VALUES (?, ?)', data)
    },
    delete: (id: number) => {
        return db.query('DELETE FROM activity_tag WHERE id = ?', [id])
    },
    deleteByActivityId: (id: number) => {
        return db.query('DELETE FROM activity_tag WHERE activity_id = ?', [id])
    }
}

export default ActivityTag