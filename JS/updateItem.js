$(document).ready(function(){
    async function getCategories(categSelected){
        await $.ajax({
            type:'POST',
            url:'./PHP/getCategories.php',
            dataType:'json',
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            success: function(data){
                if(data.status=='ok'){
                    let categories = data
                    for(let i=0;categories.categ.length>i;i++){
                        let newOption = document.createElement('option')
                        newOption.textContent = categories.categ[i]
                        newOption.value = categories.categ[i]
                        $('.categSelection').append(newOption)
                    }
                    document.getElementById('categSelection').value = categSelected
                }
                if(data.status=='error'){
                    console.log(data.error)   
                }
            }
        })
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const itemID = urlParams.get('id')
    $.ajax({
        type:'POST',
        url:'./PHP/getItem.php',
        dataType:'json',
        data:{
            prodId:itemID
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        },
        success:function(data){
            if (data.status=='ok'){
                const contentDiv = $('.content')
                const stockDiv = $('.stockDiv')
                const categDiv = $('.categDiv')
                const imgDiv = document.createElement('div')
                imgDiv.className = 'imgDiv'
                const prodImg = document.createElement('img')
                prodImg.className = 'prodImg'
                prodImg.src = './pictures/products/'+data.itemImg
                const prodName = document.createElement('input')
                prodName.value = data.prodName
                prodName.classList = 'prodName prodText'
                prodName.id = 'prodName'
                prodName.disabled = 'true'
                const prodPrice = document.createElement('input')
                prodPrice.className = 'prodPrice prodText'
                prodPrice.value = 'P'+data.price
                prodPrice.id = 'prodPrice'
                prodPrice.disabled = 'true'
                const stockText = document.createElement('h1')
                stockText.textContent = "Stock: "+data.stock
                stockText.className = 'stockText'
                stockText.id = 'stockText'
                const categText = document.createElement('h1')
                categText.textContent = "Category:"
                categText.className = 'categText'
                getCategories(data.categ)
                contentDiv.append(imgDiv)
                $('.nameDiv').append(prodName)
                $('.priceDiv').append(prodPrice)
                stockDiv.append(stockText)
                categDiv.append(categText)
                imgDiv.append(prodImg)
                document.getElementById('prodDescText').value = data.desc
                const updateButton = document.createElement('button')
                updateButton.type = 'button'
                updateButton.id = 'updateButton'
                updateButton.className = 'updateButton'
                updateButton.textContent = 'UPDATE'
                contentDiv.append(updateButton)
                updateButton.addEventListener('click', function(){
                    let newCateg = document.getElementById('categSelection').value
                    let newCategInput = document.getElementById('categInput')
                    if(newCategInput.value.trim()){
                        newCateg = newCategInput.value
                    }
                    var file_data = $('#imgInput').prop('files')[0];
                    var form_data = new FormData();
                    form_data.append('imgInput', file_data);
                    form_data.append('productID', data.id)
                    form_data.append('newProdName', prodName.value);
                    form_data.append('newPrice', parseInt(prodPrice.value.match(/\d+/g)[0]));
                    form_data.append('newStock', parseInt(stockText.textContent.match(/\d+/g)[0]));
                    form_data.append('newCateg', newCateg);
                    form_data.append('newDesc', document.getElementById('prodDescText').value);

                    $.ajax({
                        type:'POST',
                        url:'./PHP/updateProduct.php',
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType:'json',
                        data: form_data,
                        error: function(xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                        success:function(data){
                            if (data.status=='ok') {
                                location.replace('./products')                                
                            }
                        }
                    })
                })
                document.getElementById('resetIcon').addEventListener('click', function(){
                    stockText.textContent = "Stock: "+data.stock
                })
            }
        }
    })
    document.getElementById('backIcon').addEventListener('click', function(){
        window.location.replace('./products')
    })
})