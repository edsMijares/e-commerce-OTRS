$(document).ready(function(){
    $.ajax({
        type:'POST',
        url:'./PHP/getOrders.php',
        dataType:'json',
        data:{
            status:'Pending'
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        },
        success:async function(data){
            if(data.status=='ok'){
                postItem(data, "Pending")
            }
            if (data.status=='noRecords') {
                const receivedDiv = document.getElementById('pendingDiv')
                const noRecordDiv = document.createElement('div')
                const noRecordImg = document.createElement('img')
                const noRecordText = document.createElement('h1')

                noRecordDiv.className = 'noRecordDiv'
                noRecordImg.className = 'noRecordImg'
                noRecordText.className = 'noRecordText'
                noRecordText.textContent = 'NO RECORD FOUND'
                noRecordImg.src = "./pictures/noRecord.jpg"
                
                noRecordDiv.append(noRecordText)
                noRecordDiv.append(noRecordImg)
                receivedDiv.append(noRecordDiv)   
            }
        }
    })
})