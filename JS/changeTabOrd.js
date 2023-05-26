let pendingText = document.getElementById('pendingText')
let orderText = document.getElementById('orderText')
let deliText = document.getElementById('deliText')
let backgroundPending = document.getElementById('backgroundPending')
let backgroundOrderText = document.getElementById('backgroundOrderText')
let backgroundDeli = document.getElementById('backgroundDeli')
let ordersDiv = document.getElementById('ordersDiv')
let pendingDiv = document.getElementById('pendingDiv')
let deliDiv = document.getElementById('deliDiv')

function resetTabs(pendingText,orderText,deliText,backgroundPending,backgroundOrderText,backgroundDeli,pendingDiv,ordersDiv,deliDiv){
    pendingText.style.color = '#F55139'
    orderText.style.color = '#F55139'
    deliText.style.color = '#F55139'
    backgroundPending.style.backgroundColor = 'white'
    backgroundDeli.style.backgroundColor = 'white'
    backgroundOrderText.style.backgroundColor = 'white'
    pendingDiv.style.visibility = 'hidden'
    ordersDiv.style.visibility = 'hidden'
    deliDiv.style.visibility = 'hidden'
}

pendingText.addEventListener('click',function(){
    resetTabs(pendingText,orderText,deliText,backgroundPending,backgroundOrderText,backgroundDeli,pendingDiv,ordersDiv,deliDiv)
    pendingText.style.color = 'white'
    backgroundPending.style.backgroundColor = '#F55139'
    pendingDiv.style.visibility = 'visible'
})
orderText.addEventListener('click', function(){
    resetTabs(pendingText,orderText,deliText,backgroundPending,backgroundOrderText,backgroundDeli,pendingDiv,ordersDiv,deliDiv)
    orderText.style.color = 'white'
    backgroundOrderText.style.backgroundColor = '#F55139'
    ordersDiv.style.visibility = 'visible'
})
deliText.addEventListener('click', function(){
    resetTabs(pendingText,orderText,deliText,backgroundPending,backgroundOrderText,backgroundDeli,pendingDiv,ordersDiv,deliDiv)
    deliText.style.color = 'white'
    backgroundDeli.style.backgroundColor = '#F55139'
    deliDiv.style.visibility = 'visible'
})
