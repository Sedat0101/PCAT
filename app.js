const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path');
const Photo = require('./models/Photo');

const app = express()

// Connet DB
mongoose.connect('mongodb://localhost/pcat-test-db', {})

// Template Engine
app.set("view engine", "ejs")
// Set önceden tanımlı konfigürasyın değişkenleri kullanılır
// Burada express'e diyoruz ki template engine olarak biz ejs kullancağız
// ejs bizim klasör yapısında ki views klasörünün içine bakar




//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Routes 
app.get('/', async (req, res) => {
    //res.sendFile(path.resolve('temp','index.html'))
    const photos = await Photo.find({})
    res.render("index", {
        photos
    })
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.get('/photos/:id', async (req, res) => {
    // console.log(req.params.id)
    // res.render("about")
    const photo = await Photo.findById(req.params.id)
    res.render("photo", {
        photo
    })
})

app.get('/addPhoto', (req, res) => {
    res.render("addPhoto")
})

app.post('/photos', async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/')
})


// GET res genel olarak verileri listelemek için kullanılır
// POST veri göndermek için kullanılır

const port = 3000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`)
})