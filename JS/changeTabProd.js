let prodsButton = document.getElementById('prodsButton')
let newProdsButton = document.getElementById('newProdsButton')
let prodsDiv = document.getElementById('prodsDiv')
let newProdsDiv = document.getElementById('newProdsDiv')
prodsButton.addEventListener('click', function(){
    prodsDiv.style.visibility = 'visible'
    newProdsDiv.style.visibility = 'hidden'
    prodsButton.style.backgroundColor = '#F55139'
    prodsButton.style.color = 'white'
    prodsButton.style.fontWeight = 'bolder'
    newProdsButton.style.backgroundColor = 'white'
    newProdsButton.style.color = 'black'
})
newProdsButton.addEventListener('click', function(){
    prodsDiv.style.visibility = 'hidden'
    newProdsDiv.style.visibility = 'visible'
    newProdsButton.style.backgroundColor = '#F55139'
    newProdsButton.style.color = 'white'
    newProdsButton.style.fontWeight = 'bolder'
    prodsButton.style.backgroundColor = 'white'
    prodsButton.style.color = 'black'
})