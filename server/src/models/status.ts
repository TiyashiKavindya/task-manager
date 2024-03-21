import db from "../db"

const Status = {
    selectAll: () => {
        return db.query('SELECT * FROM status')
    },
    selectById: (id: number) => {
        return db.query('SELECT * FROM status WHERE id = ?', [id])
    },
}

export default Status