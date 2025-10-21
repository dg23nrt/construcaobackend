// importar express
const express = require('express')

//criar uma estancia no meu backend com express
const app = express()

//Intermediarios (Middlewares)
app.get('/hello' , (req, res, next) => {
    res.send('hello Word!!!')
})

app.get('/pessoas' , (req, res, next) => {
    const pessoas = [{
        id: 1,
        nome: "diego sousa"
}
{
    id
}
    ]
})


// executar a aplicaçao escolhendo a portya que ela vai escutar 
app.listen(3000, () => {
    console.log("Minha aplicaçao esta rodando em http://localhost:3000")
})

