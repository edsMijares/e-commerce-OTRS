$(document).ready(function(){
    function getStatus(){
        let uname = document.getElementById('unameValue').textContent
        $.ajax({
            type:'POST',
            url:'./PHP/getStatus.php',
            dataType:'json',
            data:{
                uname:uname
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            success:function(data){
                if (data.status=='WAITING') {
                    document.getElementById('mnText').innerHTML = 'NOTIFICATION<br>RECEIVED'
                    document.getElementById('text101').innerHTML = 'The notification is received by the mechanic'
                    document.getElementById('text102').innerHTML = 'THE MECHANIC WILL CALL<br>IN A FEW SECONDS'
                }
                if (data.status=='CALLED') {
                    window.location.replace('./index')
                }
            }
        })
    }
    setInterval(function(){
        getStatus();
    },1000)
})