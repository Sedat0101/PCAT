const Photo = require('../models/Photo')
const fs = require('fs')

exports.getAllPhotos =  async (req, res) => {
    //res.sendFile(path.resolve('temp','index.html'))
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render("index", {
        photos
    })
}

exports.getPhoto =  async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render("photo", {
        photo
    })
}

exports.createPhoto =  async (req, res) => {
    // console.log(req.files.image) // Burada ki image form'un name'inden geliyor
    // await Photo.create(req.body)
    // res.redirect('/')

    const uploadDir = 'public/uploads'

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name,
        });
        res.redirect('/');
    });
}

exports.updatePhoto =  async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()
  
    res.redirect(`/photo/${req.params.id}`)
}

exports.deletePhoto =  async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    let deleteImage = __dirname + '/../public' + photo.image
    fs.unlinkSync(deleteImage)
    await Photo.findByIdAndDelete(req.params.id)
    res.redirect('/')
}