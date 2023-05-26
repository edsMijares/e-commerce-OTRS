function verify(num1,num2,num3,num4,num5,num6){
    $.ajax({
        type:'POST',
        url:'./PHP/verifyAccount.php',
        dataType:'json',
        data:{
            num1:num1,
            num2:num2,
            num3:num3,
            num4:num4,
            num5:num5,
            num6:num6,
        },
        success:function(data){
            if (data.status=='verified') {
                window.location.replace('./index')
            }
            else if(data.status=='notMatch'){
                let num1 = document.getElementById('num1')
                let num2 = document.getElementById('num2')
                let num3 = document.getElementById('num3')
                let num4 = document.getElementById('num4')
                let num5 = document.getElementById('num5')
                let num6 = document.getElementById('num6')
                num1.disabled = false
                num1.value = null
                num2.value = null
                num3.value = null
                num4.value = null
                num5.value = null
                num6.value = null
                const customToast = document.getElementById('custom-toast');
                customToast.classList.add('show-toast');
                num1.focus()
                setTimeout(function() {
                    customToast.classList.add('out-toast');
                    customToast.classList.remove('show-toast');
                    setTimeout(function() {
                        customToast.classList.remove('out-toast')
                    }, 2000);
                }, 2000);
            }
        }
    })
}