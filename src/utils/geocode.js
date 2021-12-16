const request= require('request')

const geocode=(address,callback)=>{
    const locurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5zaHVtYW45MCIsImEiOiJja3gwbzl4OXMwaTV6Mm5xbGd5a3AzNDFjIn0.-FkEumXmHVQVKZor909YDg&limit=1'
    request({url: locurl,json: true}, (error, {body})=>{
        if(error){
            callback('unable to connect',undefined) 
        }else if(body.features.length===0){
            callback('location not found',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            })
        }
    })
}

module.exports= geocode