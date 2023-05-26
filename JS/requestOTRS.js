$(document).ready(function(){
    $('#buttonOTRSW').on('click', function(){
        $.ajax({
            type:'POST',
            url:'./PHP/requestOTRS.php',
            dataType: "json",
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }, 
            success:function(data){
                window.location.replace('./otrsNotified')
            }
        })
    })
});