const request = require('request')


const forecast= (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=23cb5b1cb213c2a3472f279ea0720c93&query=' + latitude +','+  longitude +''
    request({url,json: true},(error,{body})=>{
        if (error){
            callback('unable to connect ', undefined)
        }else if(body.error){
            callback(body.error)

        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }

    })
} 

module.exports = forecast