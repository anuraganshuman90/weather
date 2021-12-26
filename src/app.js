const path = require('path')
const express= require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//define paths for express
const publicDirctoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirctoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: "weatherapp",
        name: "anshuman" 
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name: 'anshuman',
        title: 'help',
        msg: 'help message'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about us',
        name: 'anshuman'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'address must be provided'
        })
    }else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if (error){
                return res.send({ error })
            }
        
            forecast(latitude,longitude,(error,forecastdata)=>{
        
                if (error){
                    return res.send({ error })
                }
                res.send([{
                    address: req.query.address,
                    temperature: forecastdata.temperature,
                    feelslike: forecastdata.feelslike,
                    location: location,
                    humidity: forecastdata.humidity,
                    weather: forecastdata.weather
                }])
                console.log(location)
                console.log(forecastdata.weather)
                console.log(forecastdata.temperature, forecastdata.feelslike)
            })
        })
        }
    console.log(req.query)
    // res.send([{
    //     loation: req.query.address,
    //     weather: 'overcast'

    // }])
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        errormsg: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    
    res.render('404page',{
        errormsg: 'page not found',
        name: 'anshuman'
    })

})
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')

// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'anshuman',
//         age: 22
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about us</h1>')
// })



app.listen(port,()=>{
    console.log('server is up on port ' + port)
})