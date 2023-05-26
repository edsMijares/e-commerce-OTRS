$(document).ready(function(){
    let fname = document.getElementById('fname')
    let lname = document.getElementById('lname')
    let genderSelect = document.getElementById('genderSelect')
    let bday = document.getElementById('bday')
    let uname = document.getElementById('uname')
    let pass = document.getElementById('pass')
    let cpass = document.getElementById('cpass')
    let email = document.getElementById('email')
    let address = document.getElementById('address')
    let cnumber = document.getElementById('cnumber')
    function toastMessage(message){
        const customToast = document.getElementById('custom-toast');
        document.getElementById('toast-Message').textContent = message
        customToast.classList.add('show-toast');
        setTimeout(function() {
            customToast.classList.add('out-toast');
            customToast.classList.remove('show-toast');
            setTimeout(function() {
                customToast.classList.remove('out-toast')
            }, 2000);
        }, 2000);
    }
    let inputs = [fname, lname, genderSelect, bday, uname, pass, cpass, email, address, cnumber]
    $('#signupButton').on('click', function(){
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        let blankStatus = false
        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].value.length==0) {
                toastMessage('Please Fill all the Inputs')
                blankStatus = true
                break
            }
        }
        if (pass.value==cpass.value&&blankStatus==false){
            $.ajax({
                type:'POST',
                url:'./PHP/checkAvailability.php',
                dataType: "json",
                data:{
                    uname:uname.value,
                    email:email.value,
                    cnumber:cnumber.value
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status !== 0) {
                      console.log(errorThrown)
                      console.log(textStatus)
                      console.log(jqXHR)
                    }
                }, 
                success: async function(data){
                    if (data.status=='available') {
                        showLoadingScreen()
                        await sleep(3000)
                        $.ajax({
                            type:'POST',
                            url:'./PHP/signup.php',
                            dataType:'json',
                            data:{
                                fname:fname.value,
                                lname:lname.value,
                                gender:genderSelect.value,
                                bday:bday.value,
                                uname:uname.value,
                                pass:pass.value,
                                email:email.value,
                                address:address.value,
                                cnumber:cnumber.value
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                if (jqXHR.status !== 0) {
                                  console.log(errorThrown)
                                  console.log(textStatus)
                                  console.log(jqXHR)
                                }
                            },
                            success: async function(data){
                                if (data.status=='ok') {
                                    await $.ajax({
                                        type:'POST',
                                        url:'./PHP/login.php',
                                        dataType: "json",
                                        data:{
                                            usernameInput:uname.value,
                                            passInput:pass.value
                                        },
                                        error: function(xhr, status, error) {
                                            var err = eval("(" + xhr.responseText + ")");
                                            alert(err.Message);
                                        }, 
                                        success:async function(data){   
                                            if (data.status=='ok') { 
                                                $.ajax({
                                                    type:'POST',
                                                    url:'./PHP/startSession.php',
                                                    dataType: "json",
                                                    data:{
                                                        usernameInput:uname.value
                                                    },
                                                    success: function(data){
                                                        if (data.status=='ok') {
                                                            window.location.replace("./index")
                                                        }
                                                        if (data.status=='unverified'){
                                                            window.location.replace('./verificationPage')
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
                            } 
                        })
                    }
                    else if (data.status=='unameFound') {
                        toastMessage('Username is Already Taken')
                    }
                    else if (data.status=='cnumFound') {
                        toastMessage('Contact NUmber is already Used')
                    }
                    else if (data.status=='emailFound') {
                        toastMessage('Email Address is alredy Used')
                    }
                    else if (data.status=='emailError') {
                        console.log(data)
                        console.log(data.errorMessage)
                    }
                }
            });
        }
        else{
            if (pass.value!=cpass.value&&blankStatus==false) {
                toastMessage('Password Not Match')
            }
        }
        
    })
});

function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.className = 'loadingScreen'
    loadingGIF = document.getElementById('loadingGIF')
    loadingGIF.className = 'loadingGIF'
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('loadingGIF'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './JSON/143388-waiting-p.json'
    });
    const loadingText = document.createElement('h1')
    loadingText.textContent = 'LOADING'
    loadingText.className = 'loadingText'
    loadingScreen.append(loadingText)
    loadingScreen.append(loadingGIF)
    document.getElementById('body').innerHTML = ''
    document.getElementById('body').appendChild(loadingScreen);
}