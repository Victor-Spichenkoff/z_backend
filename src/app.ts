import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import mainRouter from "./routes"
import helmet from "helmet"
import path from "path"

const app = express()
configDotenv()

const allowedOrigins = [
    //front do Z e server-maint
    "https://z-frontend-seven.vercel.app",
    process.env.ENV == "dev" && "http://localhost:3000",
    //back do server maintenance
    "https://server-maintenance-ssu7.onrender.com",
    "https://server-maintenance.vercel.app"
]

const corsOptions = {
    origin: (origin: any, callback: any) => {
        // Permitir requisições sem origem (por exemplo, Postman)
        if (!origin) return callback(null, true)
        
        if (allowedOrigins.includes(origin)) {
          callback(null, true) // Origem permitida
        } else {
          callback(new Error('Not allowed by CORS')) // Origem não permitida
        }
      },
}

//basic middlwares
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use('/static', express.static(path.join(__dirname, '../public')))
app.use('/static', express.static(path.join(__dirname, '../public/static')))

//router
app.use(mainRouter)


console.log(process.env.BASE_URL)


const port = process.env.PORT ?? 2006

app.listen(port, () => console.log(`Runnig on: http://localhost:${port}`))