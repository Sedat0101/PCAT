const express = require('express')
const path = require('path');

const app = express()

//MIDDLEWARES
app.use(express.static('public'))


app.get('/', (req, res) => {
     res.sendFile(path.resolve('temp','index.html'))
})

// GET res genel olarak verileri listelemek için kullanılır
// POST veri göndermek için kullanılır

const port = 3000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`)
})