$(document).ready(function(){
    let uname = document.getElementById('uname').textContent
    let prodID = null
    let userID = null
    let quantity = null
    let totalPrice = null
    let msg = null
    $.ajax({
        type:'POST',
        url:'./PHP/getUserDetails.php',
        dataType:'json',
        data:{
            uname:uname
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        },
        success:function(data){
            if (data.status=='ok') {
                userID = data.id
                document.getElementById('fullname').textContent = data.fullname
                document.getElementById('addressLine').textContent = data.address
                document.getElementById('cnum').textContent = data.cnum
                const url = window.location.search;
                const urlParams = new URLSearchParams(url);
                document.getElementById('itemName').textContent = urlParams.get('item')
                $.ajax({
                    type: 'POST',
                    url:'./PHP/getItemDetails.php',
                    dataType:'json',
                    data:{
                        prodName:urlParams.get('item')
                    },
                    error: function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                    success:function(data){ 
                        if (data.status=='ok') {
                            prodID = data.id
                            document.getElementById('price').textContent = "P"+data.price
                            document.getElementById('stock').textContent = "Stock: "+data.stock
                            document.getElementById('ppNum').textContent = data.price
                            document.getElementById('subNum').textContent = data.price
                            document.getElementById('tNum').textContent = "P"+(parseInt(data.price)+parseInt(document.getElementById('dFee').textContent))
                        }  
                    }
                })
            }
        }
    })
    $('#checkOutButton').on('click', function(){
        checkOutButton = document.getElementById('checkOutButton')
        checkOutButton.disabled = true
        quantity = parseInt(document.getElementById('qNum').textContent)
        totalPrice = parseInt(document.getElementById('ppNum').textContent)*parseInt(document.getElementById('qNum').textContent)+parseInt(document.getElementById('dFee').textContent)
        msg = document.getElementById('message').value
        checkOut(prodID,userID,quantity,totalPrice,msg)
    })
})