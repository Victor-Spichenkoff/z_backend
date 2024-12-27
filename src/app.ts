import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import mainRouter from "./routes"
import helmet from "helmet"
import path from "path"

const app = express()
configDotenv()

//basic middlwares
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use('/static', express.static(path.join(__dirname, '../public')))
app.use('/static', express.static(path.join(__dirname, '../public/static')))

//router
app.use(mainRouter)


console.log(process.env.BASE_URL)


const port = process.env.PORT ?? 2006

app.listen(port, ()=> console.log(`Runnig on: http://localhost:${port}`))