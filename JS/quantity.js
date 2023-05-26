let quanInput = document.getElementById('quanValue')
let plusButton = document.getElementById('quanPlus')
let minusButton = document.getElementById('quanMinus')
let subNum = document.getElementById('subNum')
let qNum = document.getElementById('qNum')
let dFee = document.getElementById('dFee')
let tNum = document.getElementById('tNum')
let backButton = document.getElementById('backButton')
plusButton.addEventListener('click', function(){
    let stock = document.getElementById('stock').textContent.match(/\d+/g)[0]
    let price = document.getElementById('ppNum').innerHTML
    quanInput.value = parseInt(quanInput.value)+1
    qNum.textContent = quanInput.value
    subNum.textContent = parseInt(quanInput.value)*parseInt(price)
    tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    if (parseInt(quanInput.value)>parseInt(stock)){
        quanInput.value = stock
        qNum.textContent = stock
        subNum.textContent = parseInt(quanInput.value)*parseInt(price)
        tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    }
})
minusButton.addEventListener('click',function(){
    let price = document.getElementById('ppNum').innerHTML
    quanInput.value = parseInt(quanInput.value)-1
    qNum.textContent = quanInput.value
    subNum.textContent = parseInt(quanInput.value)*parseInt(price)
    tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    if (quanInput.value<1){
        quanInput.value = 1
        qNum.textContent = 1
        subNum.textContent = parseInt(quanInput.value)*parseInt(price)
        tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    }
})
quanInput.addEventListener('input', function(){
    let stock = document.getElementById('stock').textContent.match(/\d+/g)[0]
    let price = document.getElementById('ppNum').innerHTML
    qNum.textContent = quanInput.value
    subNum.textContent = parseInt(quanInput.value)*parseInt(price)
    tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    if (parseInt(quanInput.value)>parseInt(stock)){
        quanInput.value = stock
        qNum.textContent = stock
        subNum.textContent = parseInt(quanInput.value)*parseInt(price)
        tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    }
    if (quanInput.value[0]==0){
        quanInput.value = 1
        qNum.textContent = 1
        subNum.textContent = parseInt(quanInput.value)*parseInt(price)
        tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    }
    if (quanInput.value<1){
        quanInput.value = 1
        qNum.textContent = 1
        subNum.textContent = parseInt(quanInput.value)*parseInt(price)
        tNum.textContent = "P"+(parseInt(subNum.textContent)+parseInt(dFee.textContent))
    }
})
backButton.addEventListener('click', function(){
    history.back()
})