const express = require('express')

const app = express()

app.get('/', (rep, res) => {

    const photo = {
        id: 1,
        name: "Photo Name",
        description: "Photo description"
    }
    res.send(photo)
})
// GET res genel olarak verileri listelemek için kullanılır
// POST veri göndermek için kullanılır

const port = 3000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`)
})