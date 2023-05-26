function editName(){
    let nameInput = document.getElementById('prodName')
    let lastNameInput = nameInput.value
    nameInput.value = ''
    nameInput.placeholder = 'Type Product Name'
    nameInput.disabled = false
    nameInput.focus()
    nameInput.addEventListener('keydown', function(event){
        if(event.key === "Enter"){
            nameInput.blur()
        }
    })
    nameInput.onblur = function(){
        if(!nameInput.value.trim()){
            nameInput.value = lastNameInput
        }    
        nameInput.disabled = 'true'
    }
}
function editPrice(){
    let prodPrice = document.getElementById('prodPrice')
    let lastPrice = prodPrice.value
    prodPrice.value = ''
    prodPrice.type = 'number'
    prodPrice.placeholder = 'Type Price Value'
    prodPrice.disabled = false
    prodPrice.focus()
    prodPrice.addEventListener('keydown', function(event){
        if(event.key === "Enter"){
            prodPrice.blur()
        }
    })
    prodPrice.onblur = function(){
        if (!prodPrice.value.trim()) {
            prodPrice.type = 'text'
            prodPrice.value = lastPrice
        }else{
            if (!(prodPrice.value[0]=='P')) {
                newPrice = "P"+prodPrice.value
                prodPrice.type = 'text'
                prodPrice.value = newPrice    
            }
        }
        prodPrice.disabled = 'true'
    }
}
function editImg(){
    document.getElementById('imgInput').click()
}
document.getElementById('addButton').addEventListener('click', function(){
    let stockText = document.getElementById('stockText')
    let currentStock = stockText.textContent.match(/\d+/g)[0]
    let stockInput = document.getElementById('inputNewStock')
    if (!stockInput.value.trim()) {
        stockInput.value = 0
    }
    let newStockValue = "Stock: "+(parseInt(currentStock)+parseInt(stockInput.value))
    stockText.textContent = newStockValue
    stockInput.value = null
})