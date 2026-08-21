import express, { json } from "express"
import swaggerUi from "swagger-ui-express"
import { readFile } from 'node:fs/promises';
import taskRouter from "./routes/TaskRoute.js";
import metaRouter from "./routes/MetaRoute.js";
import errorHandler from "./middleware/error-handler.js";
import initializeTable from "./repositories/InitialTableRepo.js";
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000
const swaggerDocument = await readFile('./openapi.json', {encoding: 'utf8'})

app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)))

app.use("/", taskRouter)
app.use("/", metaRouter)

app.use(errorHandler)

app.listen(port,() => {
    initializeTable();
    console.log(`Listening to ${port}`)
})