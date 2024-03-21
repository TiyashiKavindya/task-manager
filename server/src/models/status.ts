import db from "../db"

const Status = {
    selectById: (id: number) => {
        return db.query('SELECT * FROM status WHERE id = ?', [id])
    },
}

export default Status