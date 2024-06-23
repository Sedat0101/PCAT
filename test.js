const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Connet DB
mongoose.connect('mongodb://localhost/pcat-test-db')

// Create schema

const PhotoSchema = new Schema({
    title: String,
    description: String,
})

const Photo = mongoose.model('Photo', PhotoSchema)

// Create a photo
// Photo.create({
//     title: "Photo Title 2",
//     description: "Photo description 2 lorem ipsum"
// })


// Read A Photo
// Photo.find({})
// .then(data => { console.log(data) }) 
// .catch(err => { console.error("Hata:", err); })


// Update a Photo
// const id = "6678316f202cd298e3bf0d60"

// Photo.findByIdAndUpdate(id,{
//         title: "Photo Title 1 heheheeh güncelledim",
//         description: "Photo description 1 aha güncelledim güncel hali de gözüküyor"
// }, {
//     new: true
// })
// .then((data) => { console.log(data) }) 


// Delete a Photo

id = "6678316f202cd298e3bf0d60"

Photo.findByIdAndDelete(id).then((data) => {
    console.log("Photo deleted")
})