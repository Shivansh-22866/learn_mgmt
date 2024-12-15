import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import * as dynamoose from "dynamoose"


/* Route Import */
import courseRoutes from "./routes/courseRoutes"
import userClerkRoutes from "./routes/userClerkRoutes"
import transactionRoutes from "./routes/transactionRoutes"
import { clerkMiddleware, createClerkClient, requireAuth } from "@clerk/express"

/* Configs */
dotenv.config()

const isProduction = process.env.NODE_ENV === "production"

if(!isProduction) {
    dynamoose.aws.ddb.local()
}

console.log(process.env.NODE_ENV, process.env.PORT, "is the node env")

export const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
})

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(clerkMiddleware())

/* Routes */

app.get("/", (res, req) => {
    req.send("Hello World")
})

app.use("/courses", courseRoutes)
app.use("/users/clerk", requireAuth(), userClerkRoutes)
app.use("/transactions", requireAuth(), transactionRoutes)


/* Server */
const port = process.env.PORT || 8001

if(!isProduction) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}