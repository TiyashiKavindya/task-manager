import db from "../db"

const TaskTag = {
    create: (data: any[]) => {
        return db.query('INSERT INTO task_tag (task_id, tag_id) VALUES (?, ?)', data)
    },
    delete: (id: number) => {
        return db.query('DELETE FROM task_tag WHERE id = ?', [id])
    }
}

export default TaskTag