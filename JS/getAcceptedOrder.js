$(document).ready(function(){
    $.ajax({
        type:'POST',
        url:'./PHP/getAcceptedOrders.php',
        dataType:'json',
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        },
        success: async function(data){
            if(data.status == 'ok'){
                for(i=0;i<data.rows.length;i++){
                    const quantity1 = document.createElement('p')
                    const totalPrice1 = document.createElement('h2')
                    const orderStatus1 = document.createElement('p')
                    let orderID = data.rows[i][0]
                    
                    orderStatus1.className = 'orderStatus'
                    totalPrice1.className = 'totalPrice'
                    quantity1.className = 'itemQuantity'
                    orderStatus1.textContent = data.rows[i][10]
                    totalPrice1.textContent = 'TOTAL: P'+data.rows[i][4]
                    quantity1.textContent = 'Quantity: '+data.rows[i][3]
                    await $.ajax({
                        type:'POST',
                        url:'./PHP/getItemUserbyID.php',
                        dataType:'json',
                        data:{
                            itemid:data.rows[i][1],
                            userid:data.rows[i][2]
                        },
                        error: function(xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                        success: function(ItemUser){
                            const ordersDiv = document.getElementById('ordersDiv')
                            const newDiv1 = document.createElement('div')
                            const userDiv1 = document.createElement('div')
                            const userFullname1 = document.createElement('h5')
                            const userCnum1 = document.createElement('h5')
                            const address1 = document.createElement('p')
                            const prodDiv1 = document.createElement('div')
                            const prodName1 = document.createElement('h3')
                            const price1 = document.createElement('p')
                            const IDitem1 = document.createElement('p')
                            const acceptButton1 = document.createElement('button')
                            const pendingDate1 = document.createElement('h5')
                            const image1 = document.createElement('img')
                            const userIcon1 = document.createElement('img')
                            const contactIcon1 = document.createElement('img')
                            
                            userDiv1.className = 'userDiv'
                            newDiv1.className = 'newDiv' 
                            prodDiv1.className = 'prodDiv'

                            userFullname1.className = 'userFullname'
                            userCnum1.className = 'userCnum'
                            address1.className = 'userAddress'
                            prodName1.className = 'prodName'
                            price1.className = 'itemPrice'
                            acceptButton1.className = 'acceptButton'
                            IDitem1.className = 'IDitem'
                            image1.className = 'divImage'
                            pendingDate1.className = 'pendingDate'
                            userIcon1.className = 'userIcon'
                            contactIcon1.className = 'contactIcon'

                            userFullname1.textContent = ItemUser['user']['fullname']
                            userCnum1.textContent = ItemUser['user']['cnum']
                            address1.textContent = ItemUser['user']['address']
                            prodName1.textContent = ItemUser['item']['prodName']
                            price1.textContent = 'Price: P'+ItemUser['item']['price']
                            IDitem1.textContent = 'ID: '+ItemUser['item']['id']
                            pendingDate1.textContent = data.rows[i][7]
                            acceptButton1.textContent = 'DELIVERED'

                            image1.src = './pictures/deliveryIcon.png'
                            userIcon1.src = './pictures/userIcon.png'
                            contactIcon1.src = './pictures/contactIcon.png'

                            userDiv1.append(userFullname1)
                            userDiv1.append(userCnum1)
                            userDiv1.append(address1)
                            userDiv1.append(userIcon1)
                            userDiv1.append(contactIcon1)
                            prodDiv1.append(prodName1)
                            prodDiv1.append(price1)
                            prodDiv1.append(quantity1)
                            prodDiv1.append(totalPrice1)
                            newDiv1.append(userDiv1)
                            newDiv1.append(prodDiv1)
                            newDiv1.append(acceptButton1)
                            newDiv1.append(pendingDate1)
                            newDiv1.append(image1)
                            newDiv1.append(orderStatus1)
                            ordersDiv.append(newDiv1)
                            acceptButton1.addEventListener('click',async function(){
                                await $.ajax({
                                    type:'POST',
                                    url:'./PHP/deliverOrder.php',
                                    dataType:'json',
                                    data:{
                                        orderID:orderID
                                    },
                                    error: function(xhr, status, error) {
                                        var err = eval("(" + xhr.responseText + ")");
                                        alert(err.Message);
                                    },
                                    success: function(data){
                                        if(data.status=='ok'){
                                            window.location.reload()
                                        }
                                        
                                    }
                                })
                            })
                        }
                    })       
                }
            }
        }
    })
})