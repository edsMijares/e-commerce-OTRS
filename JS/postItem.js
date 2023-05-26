function postItem(data, status){
    for(i=0;i<data.rows.length;i++){
        function formatDate(date){
            const datetime = new Date(date);
            const day = datetime.getDate();
            const year = datetime.getFullYear();
            const month = datetime.toLocaleString('default', { month: 'long' });
            const formattedDate = `${month} ${day}, ${year}`;
            return formattedDate
        }
        const quantity = document.createElement('p')
        const totalPrice = document.createElement('h2')
        const orderStatus = document.createElement('p')
        let orderID = data.rows[i][0]
        let orderTime = formatDate(data.rows[i][6])
        let deliveredTime = formatDate(data.rows[i][8])
        let receivedTime = formatDate(data.rows[i][9])
        let promisetoShip = data.rows[i][7]
        orderStatus.className = 'postOrderStatus'
        totalPrice.className = 'postTotalPrice'
        quantity.className = 'postItemQuantity'
        orderStatus.textContent = data.rows[i][10]
        totalPrice.textContent = 'TOTAL: P'+data.rows[i][4]
        quantity.textContent = 'Quantity: '+data.rows[i][3]
        $.ajax({
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
            success:async function(ItemUser){
                const newDiv = document.createElement('div')
                const userDiv = document.createElement('div')
                const userIcon = document.createElement('img')
                const contactIcon = document.createElement('img')
                const userFullname = document.createElement('h5')
                const userCnum = document.createElement('h5')
                const address = document.createElement('p')
                const pendingDate = document.createElement('h5')
                const prodDiv = document.createElement('div')
                const prodName = document.createElement('h3')
                const price = document.createElement('p')
                const image = document.createElement('img')
                const confirmButton = document.createElement('button')
                
                newDiv.className = 'postNewDiv'
                userDiv.className = 'postUserDiv'
                userIcon.className = 'postUserIcon'
                contactIcon.className = 'postContactIcon'
                userFullname.className = 'postUserFullname'
                userCnum.className = 'postUserCnum'
                address.className = 'postUserAddress'
                pendingDate.className = 'postPendingDate'
                prodDiv.className = 'postProdDiv'
                prodName.className = 'postProdName'
                price.className = 'postItemPrice'
                image.className = 'postDivImage'
                confirmButton.className = 'confirmButton'

                userIcon.src = './pictures/userIcon.png'
                contactIcon.src = './pictures/contactIcon.png'
                image.src = './pictures/deliveryIcon.png'

                userFullname.textContent = ItemUser['user']['fullname']
                userCnum.textContent = ItemUser['user']['cnum']
                address.textContent = ItemUser['user']['address']
                prodName.textContent = ItemUser['item']['prodName']
                price.textContent = 'Price: P'+ItemUser['item']['price']
                confirmButton.textContent = 'CONFIRM'

                userDiv.append(userCnum)
                userDiv.append(userFullname)
                userDiv.append(address)
                userDiv.append(userIcon)
                userDiv.append(contactIcon)
                newDiv.append(userDiv)
                newDiv.append(orderStatus)
                newDiv.append(pendingDate)
                newDiv.append(prodDiv)
                newDiv.append(image)
                prodDiv.append(prodName)
                prodDiv.append(price)
                prodDiv.append(quantity)
                prodDiv.append(totalPrice)  
                if(status=='Pending'){
                    const pendingDiv = document.getElementById('pendingDiv')
                    pendingDate.textContent = orderTime
                    pendingDiv.append(newDiv)
                }
                if(status=='To Ship'){
                    const toShipDiv = document.getElementById('toShipDiv')
                    pendingDate.textContent = promisetoShip
                    toShipDiv.append(newDiv)
                }
                if(status=='DONE'){
                    const completedDiv = document.getElementById('completedDiv')
                    pendingDate.textContent = receivedTime
                    completedDiv.append(newDiv)
                }
                if(status=='Delivered'){
                    const receivedDiv = document.getElementById('receivedDiv')
                    newDiv.append(confirmButton)
                    pendingDate.textContent = deliveredTime
                    receivedDiv.append(newDiv)
                    confirmButton.addEventListener('click', function(){
                        $.ajax({
                            type:'POST',
                            url:'./PHP/confirmReceived.php',
                            dataType:'json',
                            data:{
                                orderID:orderID
                            },
                            error: function(xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                            success:function(data){
                                if (data.status=='ok') {
                                    location.reload()
                                }
                            }
                        })
                    })
                }
            }
        })       
    }
}