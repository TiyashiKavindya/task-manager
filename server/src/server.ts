import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { SERVER_PORT } from "../config/config"
import db from "./db"
import tag from "./routes/tag"
import status from "./routes/status"
import task from "./routes/task"
import activity from "./routes/activity"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/tag', tag)
app.use('/api/status', status)
app.use('/api/task', task)
app.use('/api/activity', activity)

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`)
    db.testConnection().then((con) => console.log(con)).catch((error) => console.log(error))
})