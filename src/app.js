const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocede.js')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000

//define path for express config
const directoryName = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

//Setup handlers engine and location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(directoryName))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weathe app',
        name: 'Pulkit Aggarwal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'PulkitAggarwal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Any Help',
        msg: 'Contact us',
        name: 'Pulkit Aggarwal'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'First provide an address'
        })
    }
        geocode.geocodeURL(req.query.address,(error,{latitude,longitude,location}={})=>{
               if(error){
                 return res.send({
                     error: error
                    })
            }
            forecast.forecast(latitude, longitude, (error, {summary,precipType,temperature}={}) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }
                     res.send({
                        forecast: summary+precipType+temperature,
                        location:location
                    }) 
                })
        })
    })

  app.get('/products',(req,res)=>{
      if(!req.query.search){
        return  res.send({
              error:'Provide any search item'
          })
      }
     // console.log(req.query)
      console.log(req.query.search)
      res.send({
          product: []
      })
  })
 
 app.get('/help/*',(req,res)=>{
     res.render('404',{
        title: '404',
        name: 'Pulkit Aggarwal',
        errorMsg: 'help page article not found'
     })
 })

 app.get('*',(req,res)=>{
     res.render('404',{
        title: '404 ',
        name: 'Pulkit Aggarwal',
        errorMsg: 'Page Not Found'
     })
 })

 app.listen(port,()=>{
    console.log('Server listen at port '+port)//for heroku server
})

//  app.listen(3000,()=>{
//      console.log('Server listen at port 3000!')
//  })




//console.log(__dirname)
//console.log(path.join(__dirname,'..'))
//console.log(path.join(__dirname,'../public'))

//console.log(__filename)
//console.log(path.join(__dirname))
// app.get('',(req,res)=>{
//    // res.send('HelloExpress')
//    res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help',(req,res)=>{
//    //res.send('Help for server')
// //    res.send({
// //        name:'Pulkit',
// //        age: 22
// //    })
//     res.send([{
//         name: 'Pulkit'
//     },{
//         name: 'Aggarwal'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>Abou Express Server</h1>')
// })

