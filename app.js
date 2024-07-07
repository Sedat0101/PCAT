const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const ejs = require('ejs')
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageControllers')
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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

// Routes
app.get('/', photoController.getAllPhotos)
app.get('/photo/:id', photoController.getPhoto)
app.post('/photos', photoController.createPhoto)
app.put('/photos/:id', photoController.updatePhoto)
app.delete('/photos/:id', photoController.deletePhoto)

app.get('/about', pageController.getAboutPage)
app.get('/addPhoto', pageController.getAddPage)
app.get('/photos/edit/:id', pageController.getEditPage)



// GET res genel olarak verileri listelemek için kullanılır
// POST veri göndermek için kullanılır

const port = 3000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`)
})