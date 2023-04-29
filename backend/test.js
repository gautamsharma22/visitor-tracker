const express =require('express')
const path = require('path')
const app = express()
const port = 5000
app.get('/', (req, res) => {
    res.send("Hello from Backend")
})
app.listen(port, () => {
    console.log("app is listning on post 5000")
})