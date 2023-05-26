$(document).ready(function(){
    $.ajax({
        type:'POST',
        url:'./PHP/checkVerified.php',
        dataType:'json',
        success: function(data){
            console.log(data)
            if (data.status=='unverified'){
                console.log('awef')
                window.location.replace('./verificationPage')
            }
        }
    })
})