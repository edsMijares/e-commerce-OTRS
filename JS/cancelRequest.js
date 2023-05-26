function cancelButton(uname){
    $.ajax({
        type:'POST',
        url:'./PHP/cancelRequest.php',
        dataType: "json",
        data:{
            uname:uname
        },
        success:function(){
            fetch('./PHP/updateDB.php', {
                method: 'POST',
                body: JSON.stringify({ status: 'true' })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
            })
            .catch(error => {
                console.error(error);
            });
            window.location.replace('./index')
        }
    })
}