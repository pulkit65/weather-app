const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/cc3a97a0d4006e66f0ddc38c275acca0/'+longitude+','+latitude
//    request({url: url,json: true},(error,response)=>{
    request({url,json: true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect!',undefined)
        }
        else if(body.error){
            callback('Unable to find loacation',undefined)
        }
        else{
            callback(undefined,{
                summary:body.daily.data[0].summary,
                precipType:body.daily.data[0].precipType,
                temperature: body.currently.temperature
            })
        }
    })
}
module.exports = {
     forecast
}