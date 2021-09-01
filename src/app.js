const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000
//path to directories
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')

//Setting view engina and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setting static file location
app.use(express.static(publicDirectoryPath))
//setting routes
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Livin Sunny"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Livin Sunny'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a Help message',
        name: "Livin Sunny"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query?.address){
        return res.send({error: "Address is a mandatory field in the request"})
    } 
    
    geocode(req.query?.address, (error, response) => {
        if(error){                       
            return res.send({error})
        }
        forcast(response, (error, response) => {
            if(error){
                return res.send({error})
            }          
            res.send({forcast: response,
                location: req.query?.address
            })            
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error",
        errorMessage: "The Help message is not found.",
        name: "Livin Sunny"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "Error",
        errorMessage: "404 Error. Page not found.",
        name: "Livin Sunny"
    })
})
//starting server
app.listen(port, () => {
    console.log('Server is running on port 3000')
})