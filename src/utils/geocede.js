const request = require('request')

const geocodeURL = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHVsa2l0YWdnYXJ3YWw2NSIsImEiOiJja2U0ajJucXUwNWE1MnRwOHdqbmQ3cXppIn0.EiVGjeowFVd9Z2FC_sTVbQ'
   // request({ url: url, json: true},(error,response)=>{
    request({ url, json: true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }//else if(response.body.features.length === 0){
            else if(body.features.length === 0){
            callback('Unable to connect Please try with some other loaction search',undefined)
            }
          else{
                callback(undefined,{
                    latitude:body.features[0].center[1],
                    longitude:body.features[0].center[0],
                    location:body.features[0].place_name
                })
            }
       
    })
}

module.exports = {
     geocodeURL
}