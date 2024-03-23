import db from "../db"

const ActivityType = {
    selectAll: () => {
        return db.query('SELECT * FROM activity_type')
    },
    selectById: (id: number) => {
        return db.query('SELECT * FROM activity_type WHERE id = ?', [id])
    },
}

export default ActivityType