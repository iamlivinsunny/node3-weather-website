const weatherForm = document.querySelector("form")
const searchLocation = document.querySelector("input")
const result = document.querySelector("#weather")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    result.innerHTML = `<span>Loading weather info ...</span>`
    const location = searchLocation.value
    if (location) {
        fetch(`http://localhost:3000/weather?address=${location}`).then(response => response.json()).then(data => {
            if (data?.error) {
                console.log(data?.error)
                result.innerHTML = `<span>${data?.error}</span>`
            }
            else {
                console.log(data)
                result.innerHTML = `<span>${data?.forcast}</span>`
            }
        })
    } else {
        result.innerHTML = `<span>Invalid Location </span>`
    }     
})