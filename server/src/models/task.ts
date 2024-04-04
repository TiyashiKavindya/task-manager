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
        LEFT JOIN task_tag tt ON t.id = tt.task_id GROUP BY t.id
        `)
    },
    selectByActivity: (id: number) => {
        return db.query(`
        SELECT 
        t.*, 
        s.title AS status_title, s.style AS status_style,
        JSON_ARRAYAGG(CAST(tt.tag_id AS UNSIGNED)) AS tags
        FROM task t
        INNER JOIN status s ON t.status_id = s.id
        LEFT JOIN task_tag tt ON t.id = tt.task_id
        WHERE t.activity_id = ? GROUP BY t.id
        `, [id])
    },
    selectById: (id: number) => {
        return db.query('SELECT * FROM task WHERE id = ?', [id])
    },
    selectToday: () => {
        return db.query('SELECT task.id, task.name, status.title as status, status.style FROM task INNER JOIN status ON task.status_id = status.id WHERE DATE(start_date) = CURDATE()')
    },
    thisWeekTaskCount: () => {
        return db.query(`
        SELECT 
        task.status_id,
        COUNT(task.id) AS task_count
        FROM 
        task
        WHERE 
        start_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND
        start_date < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 1 WEEK) AND
        task.status_id IN (2, 3, 4)
        GROUP BY 
        task.status_id
        `)
    },
    taskCountPreDay: () => {
        return db.query(`
        SELECT 
            DAYNAME(task.start_date) AS day_of_week,
            task.status_id,
            status.title AS status,
            status.style,
            COUNT(*) AS task_count
        FROM 
            task
        INNER JOIN status ON status.id = task.status_id
        WHERE 
            task.start_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND
            task.start_date < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 1 WEEK) AND
            status.id IN (2, 3, 4)
        GROUP BY 
            day_of_week, task.status_id
        ORDER BY 
            FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), task.status_id;
        
        `)
    },
    getThisMonthTaskStats: () => {
        return db.query(`
        SELECT 
            DATE(task.start_date) AS start_date,
            task.status_id,
            status.title AS status,
            status.style,
            COUNT(*) AS task_count
        FROM 
            task
        INNER JOIN status ON status.id = task.status_id
        WHERE 
            YEAR(task.start_date) = YEAR(CURDATE()) AND
            MONTH(task.start_date) = MONTH(CURDATE())
        GROUP BY 
            start_date, task.status_id
        ORDER BY 
            start_date, task.status_id;
        `)
    },
    getThisMonthActivityStats: () => {
        return db.query(`
        SELECT 
            task.activity_id,
            task.status_id,
            status.title AS status_title,
            status.style as status_style,
            COUNT(*) AS total_tasks,
            activity.title
        FROM task
        INNER JOIN activity ON task.activity_id = activity.id
        INNER JOIN status ON task.status_id = status.id
        WHERE MONTH(task.start_date) = MONTH(CURRENT_DATE()) AND YEAR(task.start_date) = YEAR(CURRENT_DATE())
        GROUP BY 
            task.activity_id, task.status_id;        
        `)
    },
    create: (data: any[]) => {
        return db.query('INSERT INTO task (name, content, status_id, start_date, end_date, activity_id) VALUES (?, ?, ?, ?, ?, ?)', data)
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