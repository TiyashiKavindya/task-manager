import db from "../db"

const Tag = {
    SelectAll: () => {
        return db.query('SELECT * FROM tag')
    },
    selectByTaskId: (id: number) => {
        return db.query(`
        SELECT 
            t.id, t.name, t.color 
        FROM 
            tag t 
        INNER JOIN 
            task_tag tt 
        ON 
            t.id = tt.tag_id 
        WHERE 
            tt.task_id = ?
        `, [id])
    },
    selectByActivityId: (id: number) => {
        return db.query(`
        SELECT 
            t.id, t.name, t.color 
        FROM 
            tag t 
        INNER JOIN 
            activity_tag at 
        ON 
            t.id = at.tag_id 
        WHERE 
            at.activity_id = ?
        `, [id])
    }
}

export default Tag