$(document).ready(function(){
    let usernameInput = document.getElementById('usernameInput')
    let passInput = document.getElementById('passInput')
    $('#enterButton').on('click', async function(){
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        if (usernameInput.value.length==0||passInput.value.length==0) {
            alert("There is a blank Input!")
        }
        else{
            await $.ajax({
                type:'POST',
                url:'./PHP/login.php',
                dataType: "json",
                data:{
                    usernameInput:usernameInput.value,
                    passInput:passInput.value
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }, 
                success:async function(data){   
                    if (data.status=='ok') {
                        showLoadingScreen()
                        await sleep(3000); 
                        $.ajax({
                            type:'POST',
                            url:'./PHP/startSession.php',
                            dataType: "json",
                            data:{
                                usernameInput:usernameInput.value
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