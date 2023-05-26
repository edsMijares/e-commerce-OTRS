$(document).ready(function(){
    let usernameInput = document.getElementById('usernameInput')
    let passInput = document.getElementById('passInput')
    $('#enterButton').on('click', function(){
        if (usernameInput.value.length==0||passInput.value.length==0) {
            alert("There is a blank Input!")
        }
        else{
            $.ajax({
                type:'POST',
                url:'./PHP/adminLogin.php',
                dataType: "json",
                data:{
                    usernameInput:usernameInput.value,
                    passInput:passInput.value
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }, 
                success:function(data){   
                    console.log(data)
                    if (data.status=='ok') {
                        $.ajax({
                            type:'POST',
                            url:'./PHP/startAdminSession.php',
                            dataType: "json",
                            data:{
                                usernameInput:usernameInput.value
                            },
                            success: function(data){
                                if (data.status=='ok') {
                                    window.location.replace("./orders")
                                }
                            }
                        })
                    }
                    else{
                        alert("Wrong Credential")
                    }
                }
            });
        }
    })
});