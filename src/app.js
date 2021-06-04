const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

// console.log(__dirname)
//console.log(path.join(__dirname,'../public'))


const app = express()

const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res)=>{
    res.render('index.hbs',{
        title: 'Weather',
        name: 'Saurabh'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Saurabh Singh'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Hey This is Saurabh from Weather App',
        name: 'Saurabh'
    })

})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must have to provide address'
        })
    }

    geocode(req.query.address, (error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude, (error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData.temp,
            lastUpdated: forecastData.lastUpdated,
            location: data.location,
            address: req.query.address
        })

        })

    })

    // res.send({
    //     address: req.query.address
    //})
})


app.get('/products', (req,res)=>{
    if(!req.query.search){
    return res.send({
        error: 'Enter Search term'
    })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
    })

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Saurabh',
        errorMessage: 'Help Article not found'
    })
})


app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Saurabh',
        errorMessage: 'Page not found'
    })
})





// app.get('',(req,res)=>{
// res.send('Hello Express!')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})