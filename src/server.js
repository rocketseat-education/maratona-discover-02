const express = require("express")
const server = express()
const routes = require("./routes")

// usando template engine
server.set('view engine',  'ejs')

//habilitar arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))