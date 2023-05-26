$(document).ready(function(){
    function getProducts(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let categ = urlParams.get('categ');
        let search = '%'+urlParams.get('search')+'%';
        if (categ == null) {
            categ = 'None'
        }
        if (search == '%'+null+'%') {
            search = '%'
        }
        $.ajax({
            type:'POST',
            url:'./PHP/getProducts.php',
            dataType:'json',
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            data:{
                categ:categ,
                search:search
            },
            success:function(data){
                if (data.status=='ok') {
                    const parentDiv = document.getElementById('parentDiv')
                    for(i=0;i<data.rows.length;i++){
                        const newDiv = document.createElement('div')
                        const prodImg = document.createElement('img')
                        const imgDiv = document.createElement('div')
                        const detailsDiv = document.createElement('div')
                        const prodNameText = document.createElement('p')
                        const prodStock = document.createElement('p')
                        const price = document.createElement('p')
                        const buyButton = document.createElement('button')
                        const cartImg = document.createElement('img')
                        const addButton = document.createElement('button')
    
                        newDiv.className = 'newDiv'
                        imgDiv.className = 'imgDiv'
                        detailsDiv.className = 'detailDiv'
    
                        prodImg.className = 'items'
                        prodImg.alt = 'item'+i
                        prodImg.src = './pictures/products/'+data.rows[i][5]
                        cartImg.className = 'cartImg'
                        cartImg.alt = 'cartImg'
                        cartImg.src = './pictures/addCart.png'
    
                        prodNameText.className = 'prodNameText'
                        prodNameText.textContent = data.rows[i][1]
                        prodStock.className = 'stockText'
                        prodStock.textContent = 'Stock:'+data.rows[i][4]
                        price.className = 'priceText'
                        price.textContent = 'P'+data.rows[i][3]
    
                        buyButton.type = 'button'
                        buyButton.name = 'buy'+i
                        buyButton.id = 'buy'+i
                        buyButton.className = 'buyButton'
                        buyButton.textContent = 'BUY NOW'
                        addButton.type = 'button'
                        addButton.name= 'add'+i
                        addButton.id = 'add'+i
                        addButton.className = 'addButton'
                        // addButton.textContent = 'ADD'
    
                        imgDiv.append(prodImg)
    
                        detailsDiv.append(prodNameText)
                        detailsDiv.append(prodStock)
                        detailsDiv.append(price)
                        detailsDiv.append(buyButton)
                        detailsDiv.append(cartImg)
                        detailsDiv.append(addButton)
    
                        newDiv.append(imgDiv)
                        newDiv.append(detailsDiv)
                        parentDiv.appendChild(newDiv)
                        prodNameText.className = 'prodNameText' 
                        document.getElementById(buyButton.id).addEventListener("click", function(){
                            history.pushState(null, null, window.location.href);
                            window.location.replace("./checkOut?item="+prodNameText.textContent)
                        })
                        document.getElementById(addButton.id).addEventListener("click", function(){
                            let prodName = prodNameText.textContent
                            $.ajax({
                                type:'POST',
                                url: './PHP/addToCart.php',
                                dataType:'json',
                                data:{
                                    prodName:prodName
                                },
                                error: function(xhr, status, error) {
                                    var err = eval("(" + xhr.responseText + ")");
                                    alert(err.Message);
                                },
                                success:function(data){
                                    if(data.status=='ok'){
                                        const customToast = document.getElementById('custom-toast');
                                        customToast.classList.add('show-toast');
                                        setTimeout(function() {
                                            customToast.classList.add('out-toast');
                                            customToast.classList.remove('show-toast');
                                            setTimeout(function() {
                                                customToast.classList.remove('out-toast')
                                            }, 2000);
                                        }, 2000);
                                    }
                                    if(data.status=='noUser'){
                                        console.log('wef')
                                        window.location.replace('./login')
                                    }
                                }
                            })
                        })
                    }
                }
            }
        })
    }
    getProducts()
    document.getElementById('searchInput').addEventListener('input', function(){
        var currentUrl = window.location.href;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let searchValue = urlParams.get('search');
        if (searchValue == null ) {
            var newUrl = currentUrl + '&search='+document.getElementById('searchInput').value;            
        }else{
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('search', document.getElementById('searchInput').value);
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.pushState({ path: newUrl }, '', newUrl);              
        }
        window.history.pushState({ path: newUrl }, '', newUrl);
        document.getElementById('parentDiv').innerHTML = ''
        getProducts()
    })
})