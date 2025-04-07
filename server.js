const { json } = require("stream/consumers")
const QRcode = require("qrcode")
const { request } = require("http")
const express = require("express")
const { name } = require("ejs")
const path = require("path")
const fs = require("fs")
const { send } = require("process")
const app = express()

app.set('views','./views')
app.set("view engine",'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'styles')))

app.get("/",(req,res) => {
    res.render("index.ejs")
})
app.get("/QR", async (req,res) => {
    const text = req.query.text
    const QRCODEIMAGE = await QRcode.toBuffer(text)
    res.type("png").send(QRCODEIMAGE)
})
app.listen(3001,() => {
    console.log("Hello New Project")
})