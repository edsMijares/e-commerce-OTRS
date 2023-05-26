function checkOut(prodID,userID,quantity,totalPrice,msg){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const checkOutStatus = urlParams.get('checkout')
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: './PHP/addOrder.php',
            dataType:'json',
            data:{
                checkout:checkOutStatus,
                userID:userID,
                prodID:prodID,
                quantity:quantity,
                totalPrice:totalPrice,
                msg:msg
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            success: function(data){
                if (data.status=='ok'){
                    window.location.replace("./index")
                }
            }
        })
    })
}