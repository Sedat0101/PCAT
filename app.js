const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const ejs = require('ejs')
const path = require('path');
const fs = require('fs')
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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method'))

// Routes
app.get('/', async (req, res) => {
    //res.sendFile(path.resolve('temp','index.html'))
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render("index", {
        photos
    })
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.get('/photo/:id', async (req, res) => {
    // console.log(req.params.id)
    const photo = await Photo.findById(req.params.id)
    res.render("photo", {
        photo
    })
})

app.get('/addPhoto', (req, res) => {
    res.render("addPhoto")
})

app.post('/photos', async (req, res) => {
    // console.log(req.files.image) // Burada ki image form'un name'inden geliyor
    // await Photo.create(req.body)
    // res.redirect('/')

    const uploadDir = 'public/uploads'

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name,
        });
        res.redirect('/');
    });
});

app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    res.render("edit", {
        photo
    })
})

app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()
  
    res.redirect(`/photo/${req.params.id}`)
  });

// GET res genel olarak verileri listelemek için kullanılır
// POST veri göndermek için kullanılır

const port = 3000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`)
})