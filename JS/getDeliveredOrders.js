$(document).ready(function(){
    let tabStatus = false
    $('#deliText').on('click', function(){
        if(tabStatus==false){
            tabStatus = true
            $.ajax({
                type:'POST',
                url:'./PHP/getDeliveredOrders.php',
                dataType:'json',
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
                success: async function(data){
                    if(data.status == 'ok'){
                        for(i=0;i<data.rows.length;i++){
                            function setDateTime(status){
                                if (status=='Delivered') {
                                    return data.rows[i][8]
                                }
                                else if (status=='DONE') {
                                    return data.rows[i][9]
                                }    
                            }      
                            const datetime = new Date(setDateTime(data.rows[i][10]));
                            const quantity = document.createElement('p')
                            const totalPrice = document.createElement('h2')
                            const month = datetime.toLocaleString('default', { month: 'long' });
                            const day = datetime.getDate();
                            const year = datetime.getFullYear();
                            const formattedDate = `${month} ${day}, ${year}`;
                            const orderStatus = document.createElement('p')
                            let orderID = data.rows[i][0]
                            
                            orderStatus.className = 'orderStatus'
                            totalPrice.className = 'totalPrice'
                            quantity.className = 'itemQuantity'
                            orderStatus.textContent = data.rows[i][10]
                            totalPrice.textContent = 'TOTAL: P'+data.rows[i][4]
                            quantity.textContent = 'Quantity: '+data.rows[i][3]
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
                                    const deliDiv = document.getElementById('deliDiv')
                                    const newDiv = document.createElement('div')
                                    const userDiv = document.createElement('div')
                                    const userFullname = document.createElement('h5')
                                    const userCnum = document.createElement('h5')
                                    const address = document.createElement('p')
                                    const prodDiv = document.createElement('div')
                                    const prodName = document.createElement('h3')
                                    const price = document.createElement('p')
                                    const IDitem = document.createElement('p')
                                    const acceptButton = document.createElement('button')
                                    const pendingDate = document.createElement('h5')
                                    const image = document.createElement('img')
                                    const userIcon = document.createElement('img')
                                    const contactIcon = document.createElement('img')
                                    
                                    userDiv.className = 'userDiv'
                                    newDiv.className = 'newDiv' 
                                    prodDiv.className = 'prodDiv'
        
                                    userFullname.className = 'userFullname'
                                    userCnum.className = 'userCnum'
                                    address.className = 'userAddress'
                                    prodName.className = 'prodName'
                                    price.className = 'itemPrice'
                                    acceptButton.className = 'doneButton'
                                    IDitem.className = 'IDitem'
                                    image.className = 'divImage'
                                    pendingDate.className = 'pendingDate'
                                    userIcon.className = 'userIcon'
                                    contactIcon.className = 'contactIcon'
        
                                    userFullname.textContent = ItemUser['user']['fullname']
                                    userCnum.textContent = ItemUser['user']['cnum']
                                    address.textContent = ItemUser['user']['address']
                                    prodName.textContent = ItemUser['item']['prodName']
                                    price.textContent = 'Price: P'+ItemUser['item']['price']
                                    IDitem.textContent = 'ID: '+ItemUser['item']['id']
                                    pendingDate.textContent = formattedDate
                                    acceptButton.textContent = 'ALL DONE'
        
                                    image.src = './pictures/deliveryIcon.png'
                                    userIcon.src = './pictures/userIcon.png'
                                    contactIcon.src = './pictures/contactIcon.png'
        
                                    userDiv.append(userFullname)
                                    userDiv.append(userCnum)
                                    userDiv.append(address)
                                    userDiv.append(userIcon)
                                    userDiv.append(contactIcon)
                                    prodDiv.append(prodName)
                                    prodDiv.append(price)
                                    prodDiv.append(quantity)
                                    prodDiv.append(totalPrice)
                                    newDiv.append(userDiv)
                                    newDiv.append(prodDiv)
                                    newDiv.append(acceptButton)
                                    newDiv.append(pendingDate)
                                    newDiv.append(image)
                                    newDiv.append(orderStatus)
                                    deliDiv.append(newDiv)
                                }
                            })       
                        }
                    }
                }
            })
        }
    }) 
})