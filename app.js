const express = require('express')
const ejs = require('ejs')
const path = require('path');

const app = express()

// Template Engine
app.set("view engine", "ejs")
// Set önceden tanımlı konfigürasyın değişkenleri kullanılır
// Burada express'e diyoruz ki template engine olarak biz ejs kullancağız
// ejs bizim klasör yapısında ki views klasörünün içine bakar




//MIDDLEWARES
app.use(express.static('public'))


// Routes 
app.get('/', (req, res) => {
    //res.sendFile(path.resolve('temp','index.html'))
    res.render("index")
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.get('/addPhoto', (req, res) => {
    res.render("addPhoto")
})


// GET res genel olarak verileri listelemek için kullanılır
// POST veri göndermek için kullanılır

const port = 3000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`)
})