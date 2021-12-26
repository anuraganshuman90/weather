

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

// messageone.textContent = 'From js'



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    messageone.textContent = 'loading'
    messagetwo.textContent = ''
    fetch('/weather?address=' + location ).then((response)=>{
    response.json().then((data)=>{
        // console.log(data)
        if(data.error){
           messageone.textContent = data.error
        }else{
            // console.log(data[0].temperature, data[0].location)
            messageone.textContent = data[0].location
            messagetwo.textContent = "temperature " + data[0].temperature + "humidity " + data[0].humidity
        } 
    })
})
})