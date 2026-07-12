import express from "express";

const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from Josh Santeno",
        description: "First endpoint from week 1 assignment"
    })
})

app.get("/code", (req, res) => {
    res.status(200).json({
        message: "Second endpoint from week 1 assignment"
    })
})

app.listen(port,() => {
    console.log(`Listening to ${port}`)
})