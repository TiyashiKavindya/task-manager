import express, { Request, Response } from "express"
import db from "./db"
const app = express()

app.get("/", (req: Request, res: Response) => {
    db.query("insert into tag values('a', 'te')", ['test6', 'purple'])
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((error) => {
            // console.log(error);
            res.status(500).send(error)
        })


})

app.listen(5400, () => {
    console.log("Server is running on port 5400")
    db.testConnection().then((con) => console.log(con)).catch((error) => console.log(error))
})