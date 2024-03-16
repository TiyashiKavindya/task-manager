import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import db from "./db"
import tag from "./routes/tag"
import task from "./routes/task"
import activity from "./routes/activity"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/tag', tag)
app.use('/api/task', task)
app.use('/api/activity', activity)

app.listen(5400, () => {
    console.log("Server is running on port 5400")
    db.testConnection().then((con) => console.log(con)).catch((error) => console.log(error))
})