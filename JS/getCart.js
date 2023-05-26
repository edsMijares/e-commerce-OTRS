$(document).ready(function(){
    let prodIDs = []
    $.ajax({
        type:'POST',
        url:'./PHP/getCart.php',
        dataType:'json',
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        },
        success:function(data){
            if(data.status=='ok'){
                async function postItem(prodId, i) {
                    return new Promise((resolve, reject) => {
                      $.ajax({
                        type: 'POST',
                        url: './PHP/getItem.php',
                        dataType: 'json',
                        data: {
                          prodId: prodId
                        },
                        error: function (xhr, status, error) {
                          var err = eval("(" + xhr.responseText + ")");
                          alert(err.Message);
                          reject(err);
                        },
                        success: function (data) {
                          let itemDetails = data;
                          const newDiv = document.createElement('div')
                          const prodImg = document.createElement('img')
                          const imgDiv = document.createElement('div')
                          const detailsDiv = document.createElement('div')
                          const prodNameText = document.createElement('p')
                          const prodStock = document.createElement('p')
                          const price = document.createElement('p')
                          const buyButton = document.createElement('button')
                          newDiv.className = 'itemDiv'
                          imgDiv.className = 'imgDiv'
                          detailsDiv.className = 'detailDiv'
      
                          prodImg.className = 'items'
                          prodImg.alt = 'item'+i
                          prodImg.src = './pictures/products/'+itemDetails.itemImg
      
                          prodNameText.className = 'prodNameText'
                          prodNameText.textContent = itemDetails.prodName
                          prodStock.className = 'stockText'
                          prodStock.textContent = 'Stock:'+itemDetails.stock
                          price.className = 'priceText'
                          price.textContent = 'P'+itemDetails.price
      
                          buyButton.type = 'button'
                          buyButton.name = 'buy'+i
                          buyButton.id = 'buy'+i
                          buyButton.className = 'buyButton'
                          buyButton.textContent = 'CHECK OUT'
      
                          imgDiv.append(prodImg)
      
                          detailsDiv.append(prodNameText)
                          detailsDiv.append(prodStock)
                          detailsDiv.append(price)
                          detailsDiv.append(buyButton)
      
                          newDiv.append(imgDiv)
                          newDiv.append(detailsDiv)
                          prodNameText.className = 'prodNameText' 
                          buyButton.addEventListener("click", function(){
                              history.pushState(null, null, window.location.href);
                              window.location.replace("./checkOut?item="+prodNameText.textContent+"&checkout=true")
                          })
                          resolve(newDiv);
                        }
                      });
                    });
                }                  
                async function displayCart(data) {
                    let prodIds = [];
                    for (let i = 0; i < data.rows.length; i++) {
                      prodIds.push(data.rows[i][2]);
                    }
                    let items = await Promise.all(prodIds.map((prodId, i) => postItem(prodId, i)));
                    let cartDiv = document.getElementById('cartDiv');
                    cartDiv.innerHTML = ''; // clear the existing contents of the cartDiv
                    items.forEach((item) => {
                        cartDiv.appendChild(item);
                    });
                }
                displayCart(data)
            }
            if (data.status=='noCart') {
                const receivedDiv = document.getElementById('cartDiv')
                const noRecordDiv = document.createElement('div')
                const noRecordImg = document.createElement('img')
                const noRecordText = document.createElement('h1')
    
                noRecordDiv.className = 'noRecordDiv'
                noRecordImg.className = 'noRecordImg'
                noRecordText.className = 'noRecordText'
                noRecordText.textContent = 'NO RECORD FOUND'
                noRecordImg.src = "./pictures/noRecord.jpg"
                
                noRecordDiv.append(noRecordText)
                noRecordDiv.append(noRecordImg)
                receivedDiv.append(noRecordDiv)   
            }
        }
    })
})
